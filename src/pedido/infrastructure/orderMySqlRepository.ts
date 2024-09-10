import { OrderRepository } from "../domain/orderRepository";
import pool from "../../config/dbConnection";
import { RowDataPacket } from 'mysql2';

export class OrderMySqlRepository implements OrderRepository {
    async createOrder(order: any) {
        const query = `
            INSERT INTO pedidos (nombre_cliente, email_cliente, direccion_envio, producto_id, cantidad, fecha_pedido)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const { nombre_cliente, email_cliente, direccion_envio, producto_id, cantidad, fecha_pedido } = order;
        const [result] = await pool.execute(query, [nombre_cliente, email_cliente, direccion_envio, producto_id, cantidad, fecha_pedido]);

        const { insertId } = result as { insertId: number };

        const newOrderQuery = "SELECT * FROM pedidos WHERE id = ?";
        const [rows] = await pool.execute<RowDataPacket[]>(newOrderQuery, [insertId]);

        return rows[0];
    }

    async getAllOrders(): Promise<any[]> {
        const query = "SELECT * FROM pedidos";
        const [rows] = await pool.execute<RowDataPacket[]>(query);
        return rows;
    }

    async getOrderById(id: number): Promise<any> {
        const query = "SELECT * FROM pedidos WHERE id = ?";
        const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
        return rows[0];
    }

    async updateOrder(id: number, order: any) {
        const query = `
            UPDATE pedidos 
            SET nombre_cliente = ?, email_cliente = ?, direccion_envio = ?, producto_id = ?, cantidad = ?, fecha_pedido = ?
            WHERE id = ?
        `;

        const { nombre_cliente, email_cliente, direccion_envio, producto_id, cantidad, fecha_pedido } = order;
        await pool.execute(query, [nombre_cliente, email_cliente, direccion_envio, producto_id, cantidad, fecha_pedido, id]);

        return this.getOrderById(id);
    }

    async deleteOrder(id: number) {
        const query = "DELETE FROM pedidos WHERE id = ?";
        await pool.execute(query, [id]);
        return { message: "Pedido eliminado con éxito" };
    }

    // Métodos nuevos
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
