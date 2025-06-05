/* eslint-disable no-undef */
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("connect", () => {
  console.log("Conectado ao PostgreSQL");
});

pool.on("error", (err) => {
  console.error("Erro inesperado no cliente PostgreSQL:", err);
});

export { pool as db };

export async function criarTabelas() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(`
      CREATE TABLE IF NOT EXISTS IDENTIDADE (
        N_FICHA INTEGER NOT NULL UNIQUE PRIMARY KEY,
        NOME_PACIENTE TEXT NOT NULL,
        DATA_FICHA DATE NOT NULL,
        TELEFONE TEXT
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS CARACTERISTICAS (
        ID SERIAL PRIMARY KEY,
        N_FICHA INTEGER NOT NULL,
        IDADE INTEGER,
        SEXO CHAR(1),
        ALTURA DECIMAL(5,2),
        PESO INTEGER,
        FOREIGN KEY (N_FICHA) REFERENCES IDENTIDADE(N_FICHA) ON DELETE CASCADE
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS LOCALIZACAO (
        ID SERIAL PRIMARY KEY,
        N_FICHA INTEGER NOT NULL,
        ENDERECO TEXT,
        N_ENDERECO INTEGER,
        CEP TEXT,
        BAIRRO TEXT,
        CIDADE TEXT,
        ESTADO CHAR(2),
        FOREIGN KEY (N_FICHA) REFERENCES IDENTIDADE(N_FICHA) ON DELETE CASCADE
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS INFORMACOES (
        ID SERIAL PRIMARY KEY,
        N_FICHA INTEGER NOT NULL,
        LADO CHAR(1),
        N_PE TEXT,
        CAUSA_AMPUTACAO TEXT,
        TEMPO TEXT,
        FOREIGN KEY (N_FICHA) REFERENCES IDENTIDADE(N_FICHA) ON DELETE CASCADE
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS PRODUTOS (
        ID SERIAL PRIMARY KEY,
        N_FICHA INTEGER NOT NULL,
        PRODUTO TEXT,
        TIPO TEXT,
        FOREIGN KEY (N_FICHA) REFERENCES IDENTIDADE(N_FICHA) ON DELETE CASCADE
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS TIPOS (
        ID SERIAL PRIMARY KEY,
        N_FICHA INTEGER NOT NULL,
        PE TEXT,
        JOELHO TEXT,
        QUADRIL TEXT,
        ENCAIXE TEXT,
        LINER TEXT,
        N_LINER INTEGER,
        FOREIGN KEY (N_FICHA) REFERENCES IDENTIDADE(N_FICHA) ON DELETE CASCADE
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS OBSERVACOES (
        ID SERIAL PRIMARY KEY,
        N_FICHA INTEGER NOT NULL,
        PROTESE TEXT,
        ORTESE TEXT,
        COLETE TEXT,
        PALMILHA TEXT,
        VERSO TEXT,
        FOREIGN KEY (N_FICHA) REFERENCES IDENTIDADE(N_FICHA) ON DELETE CASCADE
      )
    `);

    await client.query("COMMIT");
    console.log("Tabelas PostgreSQL criadas/verificadas com sucesso.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Erro ao criar tabelas:", error);
    throw error;
  } finally {
    client.release();
  }
}
