import { OrderRepository } from "../domain/orderRepository";

interface OrderData {
    nombre_cliente: string;
    email_cliente: string;
    direccion_envio: string;
    producto_id: number;
    cantidad: number;
}

export class CreateOrder {
    private orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    async execute(data: OrderData) {
        const { nombre_cliente, email_cliente, direccion_envio, producto_id, cantidad } = data;

        if (!nombre_cliente || !email_cliente || !direccion_envio || producto_id <= 0 || cantidad <= 0) {
            throw new Error("Datos inválidos para crear el pedido");
        }

        // Validar la existencia del producto
        const producto = await this.orderRepository.getProductById(producto_id);
        if (!producto) {
            throw new Error("Producto no encontrado");
        }

        // Validar el stock del producto
        const stock = await this.orderRepository.getProductStock(producto_id);
        if (stock < cantidad) {
            throw new Error("No hay suficiente stock para el producto");
        }

        const nuevoPedido = {
            nombre_cliente,
            email_cliente,
            direccion_envio,
            producto_id,
            cantidad,
            fecha_pedido: new Date()
        };

        const createdOrder = await this.orderRepository.createOrder(nuevoPedido);

        return {
            message: "Pedido creado exitosamente",
            order: createdOrder
        };
    }
}
