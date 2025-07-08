import express from "express";
import cors from "cors";
import { conexion } from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

// RUTA DE PRUEBA
app.get("/", (req, res) => {
  res.send("API funcionando");
});

// LISTAR USUARIOS
app.get("/usuarios", (req, res) => {
  conexion.query("SELECT * FROM usuarios", (error, results) => {
    if (error) {
      console.error("❌ Error en la consulta:", error);
      res.status(500).send("Error al obtener usuarios");
    } else {
      res.json(results);
    }
  });
});

// CREAR USUARIOS
app.post("/usuarios", (req, res) => {
  const {id, nombre, correo } = req.body;
if (!id || !nombre || !correo) {
    return res.status(400).json({ error: "ID, Nombre y correo son requeridos" });
  }

  conexion.query(
    "INSERT INTO usuarios (id, nombre, correo) VALUES (?, ?, ?)",
    [id, nombre, correo],
    (error, result) => {
      if (error) {
        console.error("❌ Error al insertar:", error);
        return res.status(500).json({ error: "Error al crear usuario" });
      }
      res.status(201).json({ id, nombre, correo });
    }
  );
});


// PUT / ACTUALIZAR USUARIOS
app.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, correo } = req.body;

  conexion.query(
    "UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?",
    [nombre, correo, id],
    (error, result) => {
      if (error) {
        console.error("❌ Error al actualizar:", error);
        return res.status(500).json({ error: "Error al actualizar usuario" });
      }
      res.json({ id, nombre, correo });
    }
  );
});


// ELIMINAR USUARIOS
app.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;

  conexion.query(
    "DELETE FROM usuarios WHERE id = ?",
    [id],
    (error, result) => {
      if (error) {
        console.error("❌ Error al eliminar:", error);
        return res.status(500).json({ error: "Error al eliminar usuario" });
      }
      res.json({ mensaje: "Usuario eliminado correctamente", id });
    }
  );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});



