import { Request, Response } from "express";
import { OrderService } from "../application/orderServices";
import { OrderMySqlRepository } from "../infrastructure/orderMySqlRepository";

const orderRepository = new OrderMySqlRepository();
const orderService = new OrderService(orderRepository);

export class OrderController {
    async createOrder(req: Request, res: Response) {
        try {
            const order = await orderService.createOrder(req.body);
            res.status(201).json(order);
        } catch (error) {
            res.status(400).json({ message: "Error al Crear el Pedido" });
        }
    }

    async getAllOrders(req: Request, res: Response) {
        try {
            const orders = await orderService.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: "Error al Obtener Pedidos" });
        }
    }

    async getOrderById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const order = await orderService.getOrderById(Number(id));
            res.status(200).json(order);
        } catch (error) {
            res.status(404).json({ message: "Error al Encontrar el Pedido" });
        }
    }

    async updateOrder(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const order = await orderService.updateOrder(Number(id), req.body);
            res.status(200).json(order);
        } catch (error) {
            res.status(400).json({ message: "Error al Actualizar el Pedido" });
        }
    }

    async deleteOrder(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await orderService.deleteOrder(Number(id));
            res.status(204).send({ message: "Pedido eliminado con éxito" });
        } catch (error) {
            res.status(404).json({ message: "Error al Eliminar el Pedido" });
        }
    }
}
