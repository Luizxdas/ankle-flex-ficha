import { db } from "../config/database.js";

function runQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

function getQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.get(query, params, function (err, row) {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function allQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, function (err, rows) {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

export async function checarFichaExistente(n_ficha) {
  try {
    const row = await getQuery(
      `SELECT N_FICHA FROM IDENTIDADE WHERE N_FICHA = ?`,
      [n_ficha]
    );
    return !!row;
  } catch (err) {
    console.error("Erro ao verificar ficha:", err.message);
    throw err;
  }
}

export async function salvarFicha(req, res) {
  const dados = req.body;

  const produtos = dados.produtos;
  const observacoes = dados.observacoes;
  const verso = dados.verso;
  const outros = dados.outros;

  const n_ficha = outros?.n_ficha;

  if (!n_ficha) {
    return res.status(400).json({
      success: false,
      message: "Número da ficha não fornecido.",
    });
  }

  try {
    const fichaExiste = await checarFichaExistente(n_ficha);
    if (fichaExiste) {
      return res.status(409).json({
        success: false,
        message: "Uma ficha com esse número já existe no banco de dados.",
      });
    }

    await runQuery("BEGIN TRANSACTION");

    try {
      await runQuery(
        `INSERT INTO IDENTIDADE (N_FICHA, NOME_PACIENTE, DATA_FICHA, TELEFONE)
         VALUES (?, ?, ?, ?)`,
        [n_ficha, outros.nome_paciente, outros.data_ficha, outros.telefone]
      );

      await runQuery(
        `INSERT INTO LOCALIZACAO (N_FICHA, ENDERECO, N_ENDERECO, CEP, BAIRRO, CIDADE, ESTADO)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          n_ficha,
          outros.endereco,
          outros.n_endereco,
          outros.cep,
          outros.bairro,
          outros.cidade,
          outros.estado,
        ]
      );

      await runQuery(
        `INSERT INTO CARACTERISTICAS (N_FICHA, IDADE, SEXO, ALTURA, PESO)
         VALUES (?, ?, ?, ?, ?)`,
        [n_ficha, outros.idade, outros.sexo, outros.altura, outros.peso]
      );

      await runQuery(
        `INSERT INTO INFORMACOES (N_FICHA, LADO, N_PE, CAUSA_AMPUTACAO, TEMPO)
         VALUES (?, ?, ?, ?, ?)`,
        [
          n_ficha,
          outros.lado,
          outros.n_pe,
          outros.causa_amputacao,
          outros.tempo,
        ]
      );

      await runQuery(
        `INSERT INTO TIPOS (N_FICHA, PE, JOELHO, QUADRIL, ENCAIXE, LINER, N_LINER)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          n_ficha,
          verso.pe,
          verso.joelho,
          verso.quadril,
          verso.encaixe,
          verso.liner,
          verso.n_liner,
        ]
      );

      await runQuery(
        `INSERT INTO OBSERVACOES (N_FICHA, PROTESE, ORTESE, COLETE, PALMILHA, VERSO)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          n_ficha,
          observacoes["obs-protese"],
          observacoes["obs-ortese"],
          observacoes["obs-colete"],
          observacoes["obs-palmilha"],
          observacoes["obs-verso"],
        ]
      );

      if (produtos && typeof produtos === "object") {
        for (const [tipo, produto] of Object.entries(produtos)) {
          const valorProduto = Array.isArray(produto)
            ? JSON.stringify(produto)
            : produto;

          if (tipo) {
            await runQuery(
              `INSERT INTO PRODUTOS (N_FICHA, PRODUTO, TIPO) VALUES (?, ?, ?)`,
              [n_ficha, valorProduto, tipo]
            );
          }
        }
      }

      await runQuery("COMMIT");
      console.log("Dados salvos com sucesso!");
      return res.json({ success: true, id: n_ficha });
    } catch (error) {
      await runQuery("ROLLBACK");
      console.error("Erro durante as operações:", error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  } catch (error) {
    console.error("Erro ao salvar ficha:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function atualizarFicha(req, res) {
  const dados = req.body;

  const produtos = dados.produtos;
  const observacoes = dados.observacoes;
  const verso = dados.verso;
  const outros = dados.outros;

  const n_ficha = outros?.n_ficha;

  if (!n_ficha) {
    return res.status(400).json({
      success: false,
      message: "Número da ficha não fornecido.",
    });
  }

  try {
    const fichaExiste = await checarFichaExistente(n_ficha);
    if (!fichaExiste) {
      return res.status(404).json({
        success: false,
        message: "Ficha com esse número não encontrada no banco de dados.",
      });
    }

    await runQuery("BEGIN TRANSACTION");

    try {
      await runQuery(
        `UPDATE IDENTIDADE SET 
          NOME_PACIENTE = ?,
          DATA_FICHA = ?,
          TELEFONE = ?
         WHERE N_FICHA = ?`,
        [outros.nome_paciente, outros.data_ficha, outros.telefone, n_ficha]
      );

      await runQuery(
        `UPDATE LOCALIZACAO SET
          ENDERECO = ?,
          N_ENDERECO = ?,
          CEP = ?,
          BAIRRO = ?,
          CIDADE = ?,
          ESTADO = ?
         WHERE N_FICHA = ?`,
        [
          outros.endereco,
          outros.n_endereco,
          outros.cep,
          outros.bairro,
          outros.cidade,
          outros.estado,
          n_ficha,
        ]
      );

      await runQuery(
        `UPDATE CARACTERISTICAS SET
          IDADE = ?,
          SEXO = ?,
          ALTURA = ?,
          PESO = ?
         WHERE N_FICHA = ?`,
        [outros.idade, outros.sexo, outros.altura, outros.peso, n_ficha]
      );

      await runQuery(
        `UPDATE INFORMACOES SET
          LADO = ?,
          N_PE = ?,
          CAUSA_AMPUTACAO = ?,
          TEMPO = ?
         WHERE N_FICHA = ?`,
        [
          outros.lado,
          outros.n_pe,
          outros.causa_amputacao,
          outros.tempo,
          n_ficha,
        ]
      );

      await runQuery(
        `UPDATE OBSERVACOES SET
          PROTESE = ?,
          ORTESE = ?,
          COLETE = ?,
          PALMILHA = ?,
          VERSO = ?
         WHERE N_FICHA = ?`,
        [
          observacoes.protese,
          observacoes.ortese,
          observacoes.colete,
          observacoes.palmilha,
          observacoes.verso,
          n_ficha,
        ]
      );

      await runQuery(`DELETE FROM PRODUTOS WHERE N_FICHA = ?`, [n_ficha]);

      if (produtos && typeof produtos === "object") {
        for (const [tipo, produto] of Object.entries(produtos)) {
          const valorProduto = Array.isArray(produto)
            ? JSON.stringify(produto)
            : produto;

          if (tipo) {
            await runQuery(
              `INSERT INTO PRODUTOS (N_FICHA, PRODUTO, TIPO) VALUES (?, ?, ?)`,
              [n_ficha, valorProduto, tipo]
            );
          }
        }
      }

      await runQuery(
        `INSERT INTO TIPOS (N_FICHA, PE, JOELHO, QUADRIL, ENCAIXE, LINER, N_LINER)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          n_ficha,
          verso.pe,
          verso.joelho,
          verso.quadril,
          verso.encaixe,
          verso.liner,
          verso.n_liner,
        ]
      );

      await runQuery(
        `INSERT INTO OBSERVACOES (N_FICHA, PROTESE, ORTESE, COLETE, PALMILHA, VERSO)
           VALUES (?, ?, ?, ?, ?, ?)`,
        [
          n_ficha,
          observacoes.obs_protese,
          observacoes.obs_ortese,
          observacoes.obs_colete,
          observacoes.obs_palmilha,
          observacoes.obs_verso,
        ]
      );

      await runQuery("COMMIT");
      console.log("Ficha atualizada com sucesso!");
      return res.json({ success: true, id: n_ficha });
    } catch (error) {
      await runQuery("ROLLBACK");
      console.error("Erro durante a atualização:", error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  } catch (error) {
    console.error("Erro ao atualizar ficha:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function buscarDadosFicha(req, res) {
  const n_ficha = req.query.n_ficha;

  if (!n_ficha) {
    return res.status(400).json({
      success: false,
      message: "Número da ficha do paciente é obrigatório.",
    });
  }

  try {
    const identidade = await getQuery(
      `SELECT * FROM IDENTIDADE WHERE N_FICHA = ?`,
      [n_ficha]
    );

    if (!identidade) {
      return res.status(404).json({
        success: false,
        message: "Paciente não encontrado",
      });
    }

    const caracteristicas = await getQuery(
      `SELECT IDADE, SEXO, ALTURA, PESO FROM CARACTERISTICAS WHERE N_FICHA = ?`,
      [n_ficha]
    );

    const informacoes = await getQuery(
      `SELECT LADO, N_PE, CAUSA_AMPUTACAO, TEMPO FROM INFORMACOES WHERE N_FICHA = ?`,
      [n_ficha]
    );

    const localizacao = await getQuery(
      `SELECT ENDERECO, N_ENDERECO, CEP, BAIRRO, CIDADE, ESTADO FROM LOCALIZACAO WHERE N_FICHA = ?`,
      [n_ficha]
    );

    const observacoes = await getQuery(
      `SELECT PROTESE, ORTESE, COLETE, PALMILHA, VERSO FROM OBSERVACOES WHERE N_FICHA = ?`,
      [n_ficha]
    );

    const produtos = await allQuery(
      `SELECT PRODUTO, TIPO FROM PRODUTOS WHERE N_FICHA = ?`,
      [n_ficha]
    );

    const tipos = await allQuery(
      `SELECT PE, JOELHO, QUADRIL, ENCAIXE, LINER, N_LINER FROM TIPOS WHERE N_FICHA = ?`,
      [n_ficha]
    );

    res.json({
      success: true,
      dados: {
        identidade,
        localizacao,
        caracteristicas,
        informacoes,
        observacoes,
        produtos,
        tipos,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar dados:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function buscarDadosGeral(req, res) {
  try {
    const pacientes = await allQuery(`SELECT * FROM IDENTIDADE`);
    const produtos = await allQuery(`SELECT * FROM PRODUTOS`);

    const produtosPorFicha = produtos.reduce((acc, produto) => {
      const ficha = produto.N_FICHA;
      if (!acc[ficha]) acc[ficha] = [];
      acc[ficha].push(produto);
      return acc;
    }, {});

    const pacientesComProdutos = pacientes.map((paciente) => ({
      ...paciente,
      produtos: produtosPorFicha[paciente.N_FICHA] || [],
    }));

    res.json({
      success: true,
      dados: pacientesComProdutos,
    });
  } catch (error) {
    console.error("Erro ao buscar todos os dados:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
}
