export interface ProductoRepository {
    createProducto(producto: any): Promise<any>;
    getAllProductos(): Promise<any[]>;
    getProductoById(id: number): Promise<any>;
    updateProducto(id: number, producto: any): Promise<any>;
    deleteProducto(id: number): Promise<any>;
}
