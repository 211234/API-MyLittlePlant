import { CreateProducto } from "./createProducto";
import { ProductoRepository } from "../domain/productoRepository";

export class ProductoService {
    private productoRepository: ProductoRepository;
    private createNewProducto: CreateProducto;

    constructor(productoRepository: ProductoRepository) {
        this.productoRepository = productoRepository;
        this.createNewProducto = new CreateProducto(productoRepository);
    }

    async createProducto(data: any) {
        return this.createNewProducto.execute(data);
    }

    async getAllProductos() {
        return this.productoRepository.getAllProductos();
    }

    async getProductoById(id: number) {
        const producto = await this.productoRepository.getProductoById(id);
        if (!producto) {
            throw new Error("Producto no encontrado");
        }
        return producto;
    }

    async updateProducto(id: number, data: any) {
        const producto = await this.productoRepository.getProductoById(id);
        if (!producto) {
            throw new Error("Producto no encontrado");
        }

        // Lógica para actualizar el producto
        const updatedProducto = {
            ...producto,
            ...data,
            fecha_actualizacion: new Date(),
        };

        return this.productoRepository.updateProducto(id, updatedProducto);
    }

    async deleteProducto(id: number) {
        const producto = await this.productoRepository.getProductoById(id);
        if (!producto) {
            throw new Error("Producto no encontrado");
        }
        return this.productoRepository.deleteProducto(id);
    }
}
