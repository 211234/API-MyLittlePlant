import express from "express";
import pool from "./config/dbConnection";
import { envConfig } from "./config/env.config";
import { productoRouter } from "./catalago/interfaces/routas";

const app = express();
const port = envConfig.port;

app.use(express.json());
app.use('/flor', productoRouter);

// No necesitas llamar a `connect` explícitamente en `mysql2/promise`
pool
    .getConnection()
    .then((connection) => {
        console.log("Connected to database");
        connection.release(); // Libera la conexión cuando termines
    })
    .catch((err) => {
        console.error("Database connection error", err);
    });

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
