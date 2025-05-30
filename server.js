import express from "express";
import cors from "cors";
import "./src/config/database.js";
import {
  atualizarFicha,
  buscarDadosFicha,
  buscarDadosGeral,
  salvarFicha,
} from "./src/controllers/pacientesController.js";

export function createServer() {
  const app = express();
  const router = express.Router();

  app.use(express.json());
  app.use(cors());

  router.post("/salvar", salvarFicha);
  router.post("/atualizar", atualizarFicha);
  router.get("/buscar/ficha", buscarDadosFicha);
  router.get("/buscar/todos", buscarDadosGeral);

  app.use("/", router);

  app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000");
  });
}
