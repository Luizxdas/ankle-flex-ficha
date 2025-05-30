import fs from "fs";
import path from "path";
import sqlite3Pkg from "sqlite3";
import { open } from "sqlite";
import { fileURLToPath } from "url";

const sqlite3 = sqlite3Pkg.verbose();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DB_PATH = path.join(__dirname, "../../banco.sqlite");

describe("Criação do Banco de Dados", () => {
  it("deve criar o arquivo do banco de dados", () => {
    const existe = fs.existsSync(DB_PATH);
    expect(existe).toBe(true);
  });

  it("deve conter todas as tabelas esperadas", async () => {
    const db = await open({
      filename: DB_PATH,
      driver: sqlite3.Database,
    });

    const tabelasEsperadas = [
      "IDENTIDADE",
      "CARACTERISTICAS",
      "LOCALIZACAO",
      "INFORMACOES",
      "PRODUTOS",
      "TIPOS",
      "OBSERVACOES",
    ];

    const result = await db.all(
      "SELECT name FROM sqlite_master WHERE type='table'"
    );
    const tabelasCriadas = result.map((r) => r.name);

    tabelasEsperadas.forEach((tabela) => {
      expect(tabelasCriadas).toContain(tabela);
    });

    await db.close();
  });
});
