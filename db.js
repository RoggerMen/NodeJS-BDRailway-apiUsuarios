import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const conexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

conexion.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a la BD:", err);
    return;
  }
  console.log("✅ Conectado a la base de datos MySQL en Railway");
});
