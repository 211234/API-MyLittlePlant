export interface OrderRepository {
    createOrder(order: any): Promise<any>;
    getAllOrders(): Promise<any[]>;
    getOrderById(id: number): Promise<any>;
    updateOrder(id: number, order: any): Promise<any>;
    deleteOrder(id: number): Promise<any>;
    getProductById(id: number): Promise<any>; // Método para obtener el producto por ID
    getProductStock(id: number): Promise<number>; // Método para obtener el stock de un producto
}
