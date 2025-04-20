import express from "express";
import sqlite3Pkg from "sqlite3";
import cors from "cors";
import { buscarDadosPaciente } from "./src/api/api.js";

const app = express();
const sqlite3 = sqlite3Pkg.verbose();
const db = new sqlite3.Database("./banco.sqlite", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");
    criarTabelas();
  }
});

app.use(express.json());
app.use(cors());

function criarTabelas() {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS IDENTIDADE (
        n_ficha_paciente INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_paciente TEXT NOT NULL,
        data_ficha DATE NOT NULL,
        numero_telefone TEXT
      )`
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS CARACTERISTICAS (
        n_ficha_paciente INTEGER PRIMARY KEY REFERENCES IDENTIDADE(n_ficha_paciente),
        idade INTEGER,
        sexo CHAR(1),
        altura REAL,
        peso INTEGER
      )`
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS LOCALIZACAO (
        n_ficha_paciente INTEGER PRIMARY KEY REFERENCES IDENTIDADE(n_ficha_paciente),
        endereco TEXT,
        n_endereco INTEGER,
        cep TEXT,
        bairro TEXT,
        cidade TEXT,
        estado CHAR(2)
      )`
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS INFORMACOES (
        n_ficha_paciente INTEGER PRIMARY KEY REFERENCES IDENTIDADE(n_ficha_paciente),
        lado CHAR(1),
        n_pe TEXT,
        causa_amputacao TEXT,
        tempo TEXT,
        produto TEXT
      )`
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS OBS (
        n_ficha_paciente INTEGER PRIMARY KEY REFERENCES IDENTIDADE(n_ficha_paciente),
        protese TEXT,
        ortese TEXT,
        colete TEXT,
        palmilha TEXT,
        verso TEXT
      )`
    );
    console.log("Tabelas verificadas/criadas com sucesso.");
  });
}

app.post("/salvar", async (req, res) => {
  const operacao = req.query.operacao || req.body.operacao;
  const dados = req.body;

  const n_ficha_paciente = dados?.n_ficha_paciente;

  if (!n_ficha_paciente) {
    return res.status(400).json({
      success: false,
      message: "Número da ficha não fornecido.",
    });
  }

  try {
    const resultado = await buscarDadosPaciente(n_ficha_paciente);
    const pacienteExiste = resultado?.success && resultado?.data;

    if (pacienteExiste && operacao === "salvar") {
      return res.status(409).json({
        success: false,
        message: "Uma ficha com esse número já existe no banco de dados.",
      });
    } else if (!pacienteExiste && operacao === "atualizar") {
      return res.status(404).json({
        success: false,
        message: "Ficha com esse número não encontrada no banco de dados.",
      });
    }
  } catch (error) {
    console.error("Erro ao buscar dados do paciente:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }

  db.serialize(() => {
    db.run("BEGIN TRANSACTION");
    db.run(
      `INSERT INTO IDENTIDADE (n_ficha_paciente, nome_paciente, data_ficha, numero_telefone)
         VALUES (?, ?, ?, ?) ON CONFLICT(n_ficha_paciente) DO UPDATE SET
         nome_paciente = excluded.nome_paciente,
         data_ficha = excluded.data_ficha,
         numero_telefone = excluded.numero_telefone`,
      [
        dados.n_ficha_paciente,
        dados.nome_paciente,
        dados.data_ficha,
        dados.numero_telefone,
      ],
      function (err) {
        if (err) {
          console.error("Erro ao inserir em IDENTIDADE:", err.message);
          db.run("ROLLBACK");
          return res.status(500).json({ success: false, message: err.message });
        }
      }
    );

    db.run(
      `INSERT INTO LOCALIZACAO (n_ficha_paciente, endereco, n_endereco, cep, bairro, cidade, estado)
         VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(n_ficha_paciente) DO UPDATE SET
         endereco = excluded.endereco,
         n_endereco = excluded.n_endereco,
         cep = excluded.cep,
         bairro = excluded.bairro,
         cidade = excluded.cidade,
         estado = excluded.estado`,
      [
        dados.n_ficha_paciente,
        dados.endereco,
        dados.n_endereco,
        dados.cep,
        dados.bairro,
        dados.cidade,
        dados.estado,
      ],
      function (err) {
        if (err) {
          console.error("Erro ao inserir em LOCALIZACAO:", err.message);
          db.run("ROLLBACK");
          return res.status(500).json({ success: false, message: err.message });
        }
      }
    );

    db.run(
      `INSERT INTO CARACTERISTICAS (n_ficha_paciente, idade, sexo, altura, peso)
         VALUES (?, ?, ?, ?, ?) ON CONFLICT(n_ficha_paciente) DO UPDATE SET
         idade = excluded.idade,
         sexo = excluded.sexo,
         altura = excluded.altura,
         peso = excluded.peso`,
      [
        dados.n_ficha_paciente,
        dados.idade,
        dados.sexo,
        dados.altura,
        dados.peso,
      ],
      function (err) {
        if (err) {
          console.error("Erro ao inserir em CARACTERISTICAS:", err.message);
          db.run("ROLLBACK");
          return res.status(500).json({ success: false, message: err.message });
        }
      }
    );

    db.run(
      `INSERT INTO INFORMACOES (n_ficha_paciente, lado, n_pe, causa_amputacao, tempo, produto)
         VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(n_ficha_paciente) DO UPDATE SET
         lado = excluded.lado,
         n_pe = excluded.n_pe,
         causa_amputacao = excluded.causa_amputacao,
         tempo = excluded.tempo,
         produto = excluded.produto`,
      [
        dados.n_ficha_paciente,
        dados.lado,
        dados.n_pe,
        dados.causa_amputacao,
        dados.tempo,
        dados.produto,
      ],
      function (err) {
        if (err) {
          console.error("Erro ao inserir em INFORMACOES:", err.message);
          db.run("ROLLBACK");
          return res.status(500).json({ success: false, message: err.message });
        }
      }
    );

    db.run("COMMIT", (err) => {
      if (err) {
        console.error("Erro no COMMIT:", err.message);
        db.run("ROLLBACK");
        return res.status(500).json({ success: false, message: err.message });
      }

      console.log("Dados salvos com sucesso!");
      res.json({ success: true, id: n_ficha_paciente });
    });
  });
});

app.get("/buscarPaciente", async (req, res) => {
  const n_ficha_paciente = req.query.n_ficha_paciente;

  if (!n_ficha_paciente) {
    return res.status(400).json({
      success: false,
      message: "Número da ficha do paciente é obrigatório",
    });
  }

  try {
    const frentePromise = new Promise((resolve, reject) => {
      db.get(
        `SELECT i.*, l.* 
         FROM IDENTIDADE i
         LEFT JOIN LOCALIZACAO l ON i.n_ficha_paciente = l.n_ficha_paciente
         WHERE i.n_ficha_paciente = ?`,
        [n_ficha_paciente],
        (err, row) => {
          if (err) return reject(err);
          resolve(row);
        }
      );
    });

    const versoPromise = new Promise((resolve, reject) => {
      db.get(
        `SELECT i.*, c.* 
         FROM INFORMACOES i
         LEFT JOIN CARACTERISTICAS c ON i.n_ficha_paciente = c.n_ficha_paciente
         WHERE i.n_ficha_paciente = ?`,
        [n_ficha_paciente],
        (err, row) => {
          if (err) return reject(err);
          resolve(row);
        }
      );
    });

    const [dadosFrente, dadosVerso] = await Promise.all([
      frentePromise,
      versoPromise,
    ]);

    if (!dadosFrente && !dadosVerso) {
      return res
        .status(404)
        .json({ success: false, message: "Paciente não encontrado" });
    }

    console.log("Dados verso: ", dadosVerso);

    res.json({
      success: true,
      dadosFrente,
      dadosVerso,
    });
  } catch (error) {
    console.error("Erro ao buscar dados:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/buscar", (req, res) => {
  const sql = `
    SELECT i.n_ficha_paciente, i.nome_paciente, i.data_ficha, inf.produto
    FROM IDENTIDADE i
    LEFT JOIN INFORMACOES inf ON i.n_ficha_paciente = inf.n_ficha_paciente
  `;

  db.all(sql, (err, rows) => {
    if (err) {
      console.error("Erro na consulta:", err.message);
      return res.status(500).json({ success: false, message: err.message });
    }

    if (!rows || rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Paciente não encontrado" });
    }

    res.json({ success: true, dados: rows });
  });
});

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
