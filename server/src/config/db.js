import dotenv from "dotenv";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 LOAD ENV HERE (MANDATORY FOR ESM)
dotenv.config({ path: path.join(__dirname, "../../.env") });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  ssl: {
    ca: fs.readFileSync(path.join(__dirname, "../../ca.pem")),
    rejectUnauthorized: false,
  },

  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
