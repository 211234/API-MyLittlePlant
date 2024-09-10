import { Router } from "express";
import { ProductoController } from "./productoController";

const productoRouter = Router();
const productoController = new ProductoController();

// Rutas de productos
productoRouter.get("/productosAll", productoController.getAllProductos);
productoRouter.get("/productos/:id", productoController.getProductoById);
productoRouter.post("/productos", productoController.createProducto);
productoRouter.put("/productos/:id", productoController.updateProducto);
productoRouter.delete("/productos/:id", productoController.deleteProducto);

export { productoRouter} ;
