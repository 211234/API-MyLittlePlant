import { Pool } from "pg";
import { envConfig } from "./env.config";

const pool = new Pool({
    user: envConfig.db.user!,
    host: envConfig.db.host!,
    database: envConfig.db.name!,
    password: envConfig.db.pass!,
    port: parseInt(envConfig.db.port!),
});

export default pool;