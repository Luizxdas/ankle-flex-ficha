import sqlite3Pkg from "sqlite3";

const sqlite3 = sqlite3Pkg.verbose();
export const db = new sqlite3.Database("./banco.sqlite", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");
    criarTabelas();
  }
});

export function criarTabelas() {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS IDENTIDADE (
        N_FICHA INTEGER NOT NULL UNIQUE PRIMARY KEY,
        NOME_PACIENTE TEXT NOT NULL,
        DATA_FICHA DATE NOT NULL,
        TELEFONE TEXT
      )`
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS CARACTERISTICAS (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        N_FICHA INTEGER NOT NULL,
        IDADE INTEGER,
        SEXO CHAR(1),
        ALTURA REAL,
        PESO INTEGER,
        FOREIGN KEY (N_FICHA) REFERENCES IDENTIDADE(N_FICHA)
      )`
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS LOCALIZACAO (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        N_FICHA INTEGER NOT NULL,
        ENDERECO TEXT,
        N_ENDERECO INTEGER,
        CEP TEXT,
        BAIRRO TEXT,
        CIDADE TEXT,
        ESTADO CHAR(2),
        FOREIGN KEY (N_FICHA) REFERENCES IDENTIDADE(N_FICHA)
      )`
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS INFORMACOES (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        N_FICHA INTEGER NOT NULL,
        LADO CHAR(1),
        N_PE TEXT,
        CAUSA_AMPUTACAO TEXT,
        TEMPO TEXT,
        FOREIGN KEY (N_FICHA) REFERENCES IDENTIDADE(N_FICHA)
      )`
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS PRODUTOS (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        N_FICHA INTEGER NOT NULL,
        PRODUTO TEXT,
        TIPO TEXT,
        FOREIGN KEY (N_FICHA) REFERENCES IDENTIDADE(N_FICHA)
      )`
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS TIPOS (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        N_FICHA INTEGER NOT NULL,
        PE TEXT,
        JOELHO TEXT,
        QUADRIL TEXT,
        ENCAIXE TEXT,
        LINER TEXT,
        N_LINER INT,
        FOREIGN KEY (N_FICHA) REFERENCES IDENTIDADE(N_FICHA)
      )`
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS OBSERVACOES (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        N_FICHA INTEGER NOT NULL,
        PROTESE TEXT,
        ORTESE TEXT,
        COLETE TEXT,
        PALMILHA TEXT,
        VERSO TEXT,
        FOREIGN KEY (N_FICHA) REFERENCES IDENTIDADE(N_FICHA)
      )`
    );

    console.log("Tabelas verificadas/criadas com sucesso.");
  });
}
