import express from "express";
import sqlite3Pkg from "sqlite3";
import cors from "cors";

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

app.post("/salvar/frente", (req, res) => {
  console.log("Recebendo dados:", JSON.stringify(req.body, null, 2));

  if (!req.body.identidade || !req.body.localizacao) {
    return res.status(400).json({
      success: false,
      message: "Dados incompletos. Verifique identidade e localizacao.",
    });
  }

  const { identidade, localizacao } = req.body;

  db.serialize(() => {
    db.run("BEGIN TRANSACTION");

    db.run(
      `INSERT INTO IDENTIDADE (n_ficha_paciente, nome_paciente, data_ficha, numero_telefone)
       VALUES (?, ?, ?, ?)`,
      [
        identidade.n_ficha_paciente,
        identidade.nome_paciente,
        identidade.data_ficha,
        identidade.numero_telefone,
      ],
      function (err) {
        if (err) {
          console.error("Erro ao inserir em IDENTIDADE:", err.message);
          db.run("ROLLBACK");
          return res.status(500).json({ success: false, message: err.message });
        }

        db.run(
          `INSERT INTO LOCALIZACAO (n_ficha_paciente, endereco, n_endereco, cep, bairro, cidade, estado)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            localizacao.n_ficha_paciente,
            localizacao.endereco,
            localizacao.n_endereco,
            localizacao.cep,
            localizacao.bairro,
            localizacao.cidade,
            localizacao.estado,
          ],
          function (err) {
            if (err) {
              console.error("Erro ao inserir em LOCALIZACAO:", err.message);
              db.run("ROLLBACK");
              return res
                .status(500)
                .json({ success: false, message: err.message });
            }

            db.run("COMMIT", (err) => {
              if (err) {
                console.error(
                  "Erro ao fazer commit da transação:",
                  err.message
                );
                db.run("ROLLBACK");
                return res
                  .status(500)
                  .json({ success: false, message: err.message });
              }

              console.log("Dados salvos com sucesso!");
              res.json({ success: true, id: identidade.n_ficha_paciente });
            });
          }
        );
      }
    );
  });
});

app.post("/salvar/verso", (req, res) => {
  console.log("Recebendo dados:", JSON.stringify(req.body, null, 2));

  if (!req.body.informacoes || !req.body.caracteristicas) {
    return res.status(400).json({
      success: false,
      message: "Dados incompletos. Verifique informacoes e caracteristicas.",
    });
  }

  const { informacoes, caracteristicas } = req.body;

  db.serialize(() => {
    db.run("BEGIN TRANSACTION");

    db.run(
      `INSERT INTO CARACTERISTICAS (n_ficha_paciente, idade, sexo, altura, peso)
       VALUES (?, ?, ?, ?, ?)`,
      [
        caracteristicas.n_ficha_paciente,
        caracteristicas.idade,
        caracteristicas.sexo,
        caracteristicas.altura,
        caracteristicas.peso,
      ],
      function (err) {
        if (err) {
          console.error("Erro ao inserir em CARACTERISTICAS:", err.message);
          db.run("ROLLBACK");
          return res.status(500).json({ success: false, message: err.message });
        }

        db.run(
          `INSERT INTO INFORMACOES (n_ficha_paciente, lado, n_pe, causa_amputacao, tempo, produto)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            informacoes.n_ficha_paciente,
            informacoes.lado,
            informacoes.n_pe,
            informacoes.causa_amputacao,
            informacoes.tempo,
            informacoes.produto,
          ],
          function (err) {
            if (err) {
              console.error("Erro ao inserir em INFORMACOES:", err.message);
              db.run("ROLLBACK");
              return res
                .status(500)
                .json({ success: false, message: err.message });
            }

            db.run("COMMIT", (err) => {
              if (err) {
                console.error(
                  "Erro ao fazer commit da transação:",
                  err.message
                );
                db.run("ROLLBACK");
                return res
                  .status(500)
                  .json({ success: false, message: err.message });
              }

              console.log("Dados salvos com sucesso!");
              res.json({ success: true, id: informacoes.n_ficha_paciente });
            });
          }
        );
      }
    );
  });
});

app.get("/buscar/frente", (req, res) => {
  const n_ficha_paciente = req.query.n_ficha_paciente;

  if (!n_ficha_paciente) {
    return res.status(400).json({
      success: false,
      message: "Número da ficha do paciente é obrigatório",
    });
  }

  db.get(
    `SELECT i.*, l.* 
     FROM IDENTIDADE i
     LEFT JOIN LOCALIZACAO l ON i.n_ficha_paciente = l.n_ficha_paciente
     WHERE i.n_ficha_paciente = ?`,
    [n_ficha_paciente],
    (err, row) => {
      if (err) {
        console.error("Erro ao buscar dados:", err.message);
        return res.status(500).json({ success: false, message: err.message });
      }

      if (!row) {
        return res
          .status(404)
          .json({ success: false, message: "Paciente não encontrado" });
      }

      res.json({
        success: true,
        data: row,
      });
    }
  );
});

app.get("/buscar/verso", (req, res) => {
  const n_ficha_paciente = req.query.n_ficha_paciente;

  if (!n_ficha_paciente) {
    return res.status(400).json({
      success: false,
      message: "Número da ficha do paciente é obrigatório",
    });
  }

  db.get(
    `SELECT i.*, c.* 
     FROM INFORMACOES i
     LEFT JOIN CARACTERISTICAS c ON i.n_ficha_paciente = c.n_ficha_paciente
     WHERE i.n_ficha_paciente = ?`,
    [n_ficha_paciente],
    (err, row) => {
      if (err) {
        console.error("Erro ao buscar dados:", err.message);
        return res.status(500).json({ success: false, message: err.message });
      }

      if (!row) {
        return res
          .status(404)
          .json({ success: false, message: "Paciente não encontrado" });
      }

      res.json({
        success: true,
        data: row,
      });
    }
  );
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
