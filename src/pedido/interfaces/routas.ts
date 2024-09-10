import { Router } from "express";
import { OrderController } from "./orderController";

const orderRouter = Router();
const orderController = new OrderController();


orderRouter.post("/pedido", orderController.createOrder);
orderRouter.get("/pedidos", orderController.getAllOrders);
orderRouter.get("/pedidos/:id", orderController.getOrderById);
orderRouter.put("/pedidos/:id", orderController.updateOrder);
orderRouter.delete("/pedidos/:id", orderController.deleteOrder);

export { orderRouter };
