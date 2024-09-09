import dotenv from "dotenv";

dotenv.config();

const { PORT, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASS || !DB_NAME) {
    throw new Error("Missing required database environment variables");
}

export const envConfig = {
    port: PORT || 3000,
    db: {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        pass: DB_PASS,
        name: DB_NAME,
    },
};