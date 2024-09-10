import { Request, Response } from "express";
import { ProductoService } from "../application/productoService";
import { ProductoMySqlRepository } from "../infrastructure/productoMySqlRepository";

const productoRepository = new ProductoMySqlRepository();
const productoService = new ProductoService(productoRepository);

export class ProductoController {
    async createProducto(req: Request, res: Response) {
        try {
            const producto = await productoService.createProducto(req.body);
            res.status(201).json({
                message: "Producto creado con éxito",
                producto: producto // Devuelve el producto creado o su ID
            });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Error al Crear el Producto" });
        }
    }

    async getAllProductos(req: Request, res: Response) {
        try {
            const productos = await productoService.getAllProductos();
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ message: "Error al Obtener Productos" });
        }
    }

    async getProductoById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const producto = await productoService.getProductoById(Number(id));
            res.status(200).json(producto);
        } catch (error) {
            res.status(404).json({ message: "Error al Encontrar el Producto" });
        }
    }

    async updateProducto(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const producto = await productoService.updateProducto(Number(id), req.body);
            res.status(200).json(producto);
        } catch (error) {
            res.status(400).json({ message: "Error al Actualizar el Producto" });
        }
    }

    async deleteProducto(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await productoService.deleteProducto(Number(id));
            res.status(204).send({
                message: "Producto eliminado con éxito"
            });
        } catch (error) {
            res.status(404).json({ message: "Error al Eliminar el Producto" });
        }
    }
}
