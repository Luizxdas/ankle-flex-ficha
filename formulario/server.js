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
        lado CHAR(1) CHECK(lado IN ('E', 'D')),
        numero_pe TEXT,
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

app.post("/salvar", (req, res) => {
  console.log("Recebendo dados:", JSON.stringify(req.body, null, 2));

  if (!req.body.info_paciente || !req.body.info_endereco) {
    return res.status(400).json({
      success: false,
      message: "Dados incompletos. Verifique info_paciente e info_endereco.",
    });
  }

  const { info_paciente, info_endereco } = req.body;

  console.log("info_paciente:", info_paciente);
  console.log("info_endereco:", info_endereco);

  if (!info_paciente.nome_paciente) {
    return res.status(400).json({
      success: false,
      message: "Campo nome_paciente é obrigatório",
    });
  }

  db.run(
    `INSERT INTO IDENTIDADE (n_ficha_paciente, nome_paciente, data_ficha, numero_telefone) 
     VALUES (?, ?, ?, ?)`,
    [
      info_paciente.n_ficha_paciente,
      info_paciente.nome_paciente,
      info_paciente.data_ficha,
      info_paciente.numero_telefone,
    ],
    function (err) {
      if (err) {
        console.error("Erro ao inserir em IDENTIDADE:", err.message);
        return res.status(500).json({ success: false, message: err.message });
      }

      console.log("Dados IDENTIDADE salvos!");

      db.run(
        `INSERT INTO LOCALIZACAO (n_ficha_paciente, endereco, n_endereco, cep, bairro, cidade, estado) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          info_paciente.n_ficha_paciente,
          info_endereco.endereco,
          info_endereco.n_endereco,
          info_endereco.cep,
          info_endereco.bairro,
          info_endereco.cidade,
          info_endereco.estado,
        ],
        function (err) {
          if (err) {
            console.error("Erro ao inserir em LOCALIZACAO:", err.message);
            return res
              .status(500)
              .json({ success: false, message: err.message });
          }

          console.log("Dados LOCALIZACAO salvos!");
          res.json({ success: true, id: info_paciente.n_ficha_paciente });
        }
      );
    }
  );
});

app.get("/buscar", (req, res) => {
  const n_ficha_paciente = req.query.nPaciente;
  console.log("Recebido número da ficha do paciente: ", n_ficha_paciente);

  db.get(
    `SELECT * FROM IDENTIDADE WHERE n_ficha_paciente = ?`,
    [n_ficha_paciente],
    (err, row) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, message: err.message });
      }

      if (!row) {
        return res
          .status(404)
          .json({ success: false, message: "Paciente não encontrado" });
      }

      console.log("Enviando resposta:", row);
      res.json({ success: true, data: row });
    }
  );
});

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
