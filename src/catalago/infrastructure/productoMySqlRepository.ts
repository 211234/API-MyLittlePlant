import { ProductoRepository } from "../domain/productoRepository";
import pool from "../../config/dbConnection"; // La conexión a la base de datos MySQL
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class ProductoMySqlRepository implements ProductoRepository {
    async createProducto(producto: any) {
        const query = `
      INSERT INTO productos (nombre, descripcion, precio, cantidad, disponible)
      VALUES (?, ?, ?, ?, ?)
    `;

        const { nombre, descripcion, precio, cantidad, disponible } = producto;
        const [result] = await pool.execute<ResultSetHeader>(query, [nombre, descripcion, precio, cantidad, disponible]);

        // Obtener el ID del nuevo producto insertado
        const insertId = result.insertId;
        return { id: insertId, ...producto };
    }

    async getAllProductos(): Promise<any[]> {
        const query = "SELECT * FROM productos";
        const [rows] = await pool.execute<RowDataPacket[]>(query);
        return rows; // rows ya es de tipo any[]
    }

    async getProductoById(id: number): Promise<any> {
        const query = "SELECT * FROM productos WHERE id = ?";
        const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
        return rows[0]; // Devolvemos solo la primera fila
    }

    async updateProducto(id: number, producto: any) {
        const query = `
      UPDATE productos 
      SET nombre = ?, descripcion = ?, precio = ?, cantidad = ?, disponible = ?, fecha_actualizacion = ?
      WHERE id = ?
    `;

        const { nombre, descripcion, precio, cantidad, disponible, fecha_actualizacion } = producto;
        await pool.execute(query, [nombre, descripcion, precio, cantidad, disponible, fecha_actualizacion, id]);

        return this.getProductoById(id); // Devolvemos el producto actualizado
    }

    async deleteProducto(id: number) {
        const query = "DELETE FROM productos WHERE id = ?";
        await pool.execute(query, [id]);
        return { message: "Producto eliminado con éxito" };
    }
}
