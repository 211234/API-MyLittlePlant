import { OrderRepository } from "../domain/orderRepository";
import { CreateOrder } from "./createOrder";

export class OrderService {
    private orderRepository: OrderRepository;
    private createNewOrder: CreateOrder;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
        this.createNewOrder = new CreateOrder(orderRepository);
    }

    async createOrder(data: any) {
        return this.createNewOrder.execute(data);
    }

    async getAllOrders() {
        return this.orderRepository.getAllOrders();
    }

    async getOrderById(id: number) {
        const order = await this.orderRepository.getOrderById(id);
        if (!order) {
            throw new Error("Pedido no encontrado");
        }
        return order;
    }

    async updateOrder(id: number, data: any) {
        const order = await this.orderRepository.getOrderById(id);
        if (!order) {
            throw new Error("Pedido no encontrado");
        }

        const updatedOrder = {
            ...order,
            ...data,
            fecha_actualizacion: new Date(),
        };

        return this.orderRepository.updateOrder(id, updatedOrder);
    }

    async deleteOrder(id: number) {
        const order = await this.orderRepository.getOrderById(id);
        if (!order) {
            throw new Error("Pedido no encontrado");
        }
        return this.orderRepository.deleteOrder(id);
    }
}
