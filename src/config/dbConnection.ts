import mysql from "mysql2/promise";
import { envConfig } from "./env.config";

const pool = mysql.createPool({
  host: envConfig.dbHost,
  user: envConfig.dbUser,
  password: envConfig.dbPassword,
  database: envConfig.dbName,
});

export default pool;
