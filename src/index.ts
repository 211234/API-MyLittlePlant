import express from "express";
import pool from "./config/dbConnection";
import { envConfig } from "./config/env.config";

const app = express();
const port = envConfig.port;

app.use(express.json());
//app.use(productRouter);

pool
    .connect()
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.error("Database connection error", err);
    });

app.listen(port, () => {
    console.log("Server is running on port " + port);
});