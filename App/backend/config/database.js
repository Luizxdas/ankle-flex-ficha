import { fileURLToPath } from "url";
import { app } from "electron";
import sqlite3Pkg from "sqlite3";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = !app || !app.isPackaged;
const isPackaged = app.isPackaged;

const dbPath = isPackaged
  ? // eslint-disable-next-line no-undef
    path.join(process.resourcesPath, "banco.sqlite")
  : path.join(__dirname, "..", "..", "banco.sqlite");

console.log("Usando banco de dados em:", dbPath);

if (!fs.existsSync(dbPath)) {
  console.error("⚠️ Arquivo banco.sqlite não encontrado!");
}

const sqlite3 = sqlite3Pkg.verbose();
export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else if (isDev) {
    console.log("Criando banco de dados SQLite.");
    criarTabelas();
  }
});

export function criarTabelas() {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS FICHAS (
        ID INTEGER PRIMARY KEY AUTOINCREMENT
      )`
    );

    db.run(`
      CREATE TABLE IF NOT EXISTS IDENTIDADE (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        FICHA_ID INTEGER NOT NULL,
        NOME_PACIENTE TEXT NOT NULL,
        DATA_FICHA DATE NOT NULL,
        TELEFONE TEXT,
        FOREIGN KEY (FICHA_ID) REFERENCES FICHAS(ID) ON DELETE CASCADE
      )
    `);

    db.run(
      `CREATE TABLE IF NOT EXISTS CARACTERISTICAS (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        FICHA_ID INTEGER NOT NULL,
        IDADE INTEGER,
        SEXO CHAR(1),
        ALTURA REAL,
        PESO INTEGER,
        FOREIGN KEY (FICHA_ID) REFERENCES FICHAS(ID)
      )`
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS LOCALIZACAO (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        FICHA_ID INTEGER NOT NULL,
        ENDERECO TEXT,
        N_ENDERECO INTEGER,
        CEP TEXT,
        BAIRRO TEXT,
        CIDADE TEXT,
        ESTADO CHAR(2),
        FOREIGN KEY (FICHA_ID) REFERENCES FICHAS(ID)
      )`
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS INFORMACOES (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        FICHA_ID INTEGER NOT NULL,
        LADO CHAR(1),
        N_PE TEXT,
        CAUSA_AMPUTACAO TEXT,
        TEMPO TEXT,
        FOREIGN KEY (FICHA_ID) REFERENCES FICHAS(ID)
      )`
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS PRODUTOS (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        FICHA_ID INTEGER NOT NULL,
        PRODUTO TEXT,
        TIPO TEXT,
        FOREIGN KEY (FICHA_ID) REFERENCES FICHAS(ID)
      )`
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS TIPOS (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        FICHA_ID INTEGER NOT NULL,
        PE TEXT,
        JOELHO TEXT,
        QUADRIL TEXT,
        ENCAIXE TEXT,
        LINER TEXT,
        N_LINER INT,
        FOREIGN KEY (FICHA_ID) REFERENCES FICHAS(ID)
      )`
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS OBSERVACOES (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        FICHA_ID INTEGER NOT NULL,
        PROTESE TEXT,
        ORTESE TEXT,
        COLETE TEXT,
        PALMILHA TEXT,
        VERSO TEXT,
        FOREIGN KEY (FICHA_ID) REFERENCES FICHAS(ID)
      )`
    );

    console.log("Tabelas verificadas/criadas com sucesso.");
  });
}
