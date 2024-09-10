import { ProductoRepository } from "../domain/productoRepository";
import pool from "../../config/dbConnection";
import { RowDataPacket } from 'mysql2';

export class ProductoMySqlRepository implements ProductoRepository {
    async createProducto(producto: any) {
        const query = `
            INSERT INTO productos (nombre, descripcion, precio, cantidad, disponible)
            VALUES (?, ?, ?, ?, ?)
        `;
        const { nombre, descripcion, precio, cantidad, disponible } = producto;
        const [result] = await pool.execute(query, [nombre, descripcion, precio, cantidad, disponible]);
        return result;
    }

    async getAllProductos(): Promise<any[]> {
        const query = "SELECT * FROM productos";
        const [rows] = await pool.execute<RowDataPacket[]>(query);
        return rows;
    }

    async getProductoById(id: number): Promise<any> {
        const query = "SELECT * FROM productos WHERE id = ?";
        const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
        return rows[0];
    }

    async updateProducto(id: number, producto: any) {
        const query = `
            UPDATE productos 
            SET nombre = ?, descripcion = ?, precio = ?, cantidad = ?, disponible = ?, fecha_actualizacion = ?
            WHERE id = ?
        `;
        const { nombre, descripcion, precio, cantidad, disponible, fecha_actualizacion } = producto;
        await pool.execute(query, [nombre, descripcion, precio, cantidad, disponible, fecha_actualizacion, id]);
        return this.getProductoById(id);
    }

    async deleteProducto(id: number) {
        const query = "DELETE FROM productos WHERE id = ?";
        await pool.execute(query, [id]);
        return { message: "Producto eliminado con éxito" };
    }

    // Nuevos métodos
    async getProductById(id: number): Promise<any> {
        const query = "SELECT * FROM productos WHERE id = ?";
        const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
        return rows[0];
    }

    async getProductStock(id: number): Promise<number> {
        const query = "SELECT cantidad FROM productos WHERE id = ?";
        const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
        return rows[0] ? rows[0].cantidad : 0;
    }
}
