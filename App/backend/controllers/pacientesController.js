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

export async function checarFichaExistente(ficha_id) {
  try {
    const row = await getQuery(
      `SELECT FICHA_ID FROM IDENTIDADE WHERE FICHA_ID = ?`,
      [ficha_id]
    );
    return !!row;
  } catch (err) {
    console.error("Erro ao verificar ficha:", err.message);
    throw err;
  }
}

export async function salvarFicha(req, res) {
  const dados = req.body;

  const ficha_id =
    dados.identidade.ficha_id_frente || dados.identidade.ficha_id_verso;

  if (!ficha_id) {
    return res.status(400).json({
      success: false,
      message: "Número da ficha não fornecido.",
    });
  }

  try {
    const fichaExiste = await checarFichaExistente(ficha_id);
    if (fichaExiste) {
      return res.status(409).json({
        success: false,
        message: "Uma ficha com esse número já existe no banco de dados.",
      });
    }

    await runQuery("BEGIN TRANSACTION");

    try {
      await runQuery(
        `INSERT INTO FICHAS (ID)
        VALUES (?)`,
        [ficha_id]
      );

      await runQuery(
        `INSERT INTO IDENTIDADE (FICHA_ID, NOME_PACIENTE, DATA_FICHA, TELEFONE)
         VALUES (?, ?, ?, ?)`,
        [
          ficha_id,
          dados.identidade.nome_paciente,
          dados.identidade.data_ficha,
          dados.identidade.telefone,
        ]
      );

      await runQuery(
        `INSERT INTO LOCALIZACAO (FICHA_ID, ENDERECO, N_ENDERECO, CEP, BAIRRO, CIDADE, ESTADO)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          ficha_id,
          dados.localizacao.endereco,
          dados.localizacao.n_endereco,
          dados.localizacao.cep,
          dados.localizacao.bairro,
          dados.localizacao.cidade,
          dados.localizacao.estado,
        ]
      );

      await runQuery(
        `INSERT INTO CARACTERISTICAS (FICHA_ID, IDADE, SEXO, ALTURA, PESO)
         VALUES (?, ?, ?, ?, ?)`,
        [
          ficha_id,
          dados.caracteristicas.idade,
          dados.caracteristicas.sexo,
          dados.caracteristicas.altura,
          dados.caracteristicas.peso,
        ]
      );

      await runQuery(
        `INSERT INTO INFORMACOES (FICHA_ID, LADO, N_PE, CAUSA_AMPUTACAO, TEMPO)
         VALUES (?, ?, ?, ?, ?)`,
        [
          ficha_id,
          dados.informacoes.lado,
          dados.informacoes.n_pe,
          dados.informacoes.causa_amputacao,
          dados.informacoes.tempo,
        ]
      );

      await runQuery(
        `INSERT INTO TIPOS (FICHA_ID, PE, JOELHO, QUADRIL, ENCAIXE, LINER, N_LINER)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          ficha_id,
          dados.tipos.pe,
          dados.tipos.joelho,
          dados.tipos.quadril,
          dados.tipos.encaixe,
          dados.tipos.liner,
          dados.tipos.n_liner,
        ]
      );

      await runQuery(
        `INSERT INTO OBSERVACOES (FICHA_ID, PROTESE, ORTESE, COLETE, PALMILHA, VERSO)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          ficha_id,
          dados.observacoes.protese,
          dados.observacoes.ortese,
          dados.observacoes.colete,
          dados.observacoes.palmilha,
          dados.observacoes.verso,
        ]
      );

      if (dados.produtos && typeof dados.produtos === "object") {
        for (const [tipo, produto] of Object.entries(dados.produtos)) {
          const valorProduto = Array.isArray(produto)
            ? JSON.stringify(produto)
            : produto;

          if (tipo) {
            await runQuery(
              `INSERT INTO PRODUTOS (FICHA_ID, PRODUTO, TIPO) VALUES (?, ?, ?)`,
              [ficha_id, valorProduto, tipo]
            );
          }
        }
      }

      await runQuery("COMMIT");
      console.log("Dados salvos com sucesso!");
      return res.json({ success: true, id: ficha_id });
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
  const ficha_id =
    dados.identidade.ficha_id_frente || dados.identidade.ficha_id_verso;

  if (!ficha_id) {
    return res.status(400).json({
      success: false,
      message: "Número da ficha não fornecido.",
    });
  }

  try {
    const fichaExiste = await checarFichaExistente(ficha_id);
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
         WHERE FICHA_ID = ?`,
        [
          dados.identidade.nome_paciente,
          dados.identidade.data_ficha,
          dados.identidade.telefone,
          ficha_id,
        ]
      );

      await runQuery(
        `UPDATE LOCALIZACAO SET
          ENDERECO = ?,
          N_ENDERECO = ?,
          CEP = ?,
          BAIRRO = ?,
          CIDADE = ?,
          ESTADO = ?
         WHERE FICHA_ID = ?`,
        [
          dados.localizacao.endereco,
          dados.localizacao.n_endereco,
          dados.localizacao.cep,
          dados.localizacao.bairro,
          dados.localizacao.cidade,
          dados.localizacao.estado,
          ficha_id,
        ]
      );

      await runQuery(
        `UPDATE CARACTERISTICAS SET
          IDADE = ?,
          SEXO = ?,
          ALTURA = ?,
          PESO = ?
         WHERE FICHA_ID = ?`,
        [
          dados.caracteristicas.idade,
          dados.caracteristicas.sexo,
          dados.caracteristicas.altura,
          dados.caracteristicas.peso,
          ficha_id,
        ]
      );

      await runQuery(
        `UPDATE INFORMACOES SET
          LADO = ?,
          N_PE = ?,
          CAUSA_AMPUTACAO = ?,
          TEMPO = ?,
          PRECO = ?,
          DATA_ENTREGA = ?
         WHERE FICHA_ID = ?`,
        [
          dados.informacoes.lado,
          dados.informacoes.n_pe,
          dados.informacoes.causa_amputacao,
          dados.informacoes.tempo,
          dados.informacoes.preco,
          dados.informacoes.data_entrega,
          ficha_id,
        ]
      );

      await runQuery(
        `UPDATE OBSERVACOES SET
          PROTESE = ?,
          ORTESE = ?,
          COLETE = ?,
          PALMILHA = ?,
          VERSO = ?
         WHERE FICHA_ID = ?`,
        [
          dados.observacoes.protese,
          dados.observacoes.ortese,
          dados.observacoes.colete,
          dados.observacoes.palmilha,
          dados.observacoes.verso,
          ficha_id,
        ]
      );

      await runQuery(`DELETE FROM PRODUTOS WHERE FICHA_ID = ?`, [ficha_id]);

      if (dados.produtos && typeof dados.produtos === "object") {
        for (const [tipo, produto] of Object.entries(dados.produtos)) {
          const valorProduto = Array.isArray(produto)
            ? JSON.stringify(produto)
            : produto;

          if (tipo) {
            await runQuery(
              `INSERT INTO PRODUTOS (FICHA_ID, PRODUTO, TIPO) VALUES (?, ?, ?)`,
              [ficha_id, valorProduto, tipo]
            );
          }
        }
      }

      await runQuery(
        `UPDATE TIPOS SET 
           PE = ?, 
           JOELHO = ?, 
           QUADRIL = ?, 
           ENCAIXE = ?, 
           LINER = ?, 
           N_LINER = ?
          WHERE FICHA_ID = ?`,
        [
          dados.tipos.pe,
          dados.tipos.joelho,
          dados.tipos.quadril,
          dados.tipos.encaixe,
          dados.tipos.liner,
          dados.tipos.n_liner,
          ficha_id,
        ]
      );

      await runQuery(
        `UPDATE OBSERVACOES SET 
           PROTESE = ?, 
           ORTESE = ?, 
           COLETE = ?, 
           PALMILHA = ?, 
           VERSO = ?,
          WHERE FICHA_ID = ?`,
        [
          dados.observacoes.protese,
          dados.observacoes.ortese,
          dados.observacoes.colete,
          dados.observacoes.palmilha,
          dados.observacoes.verso,
          ficha_id,
        ]
      );

      await runQuery("COMMIT");
      console.log("Ficha atualizada com sucesso!");
      return res.json({ success: true, id: ficha_id });
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
  const ficha_id = req.query.ficha_id;

  if (!ficha_id) {
    return res.status(400).json({
      success: false,
      message: "Número da ficha do paciente é obrigatório.",
    });
  }

  try {
    const identidade = await getQuery(
      `SELECT * FROM IDENTIDADE WHERE FICHA_ID = ?`,
      [ficha_id]
    );

    if (!identidade) {
      return res.status(404).json({
        success: false,
        message: "Paciente não encontrado",
      });
    }

    const caracteristicas = await getQuery(
      `SELECT IDADE, SEXO, ALTURA, PESO FROM CARACTERISTICAS WHERE FICHA_ID = ?`,
      [ficha_id]
    );

    const informacoes = await getQuery(
      `SELECT LADO, N_PE, CAUSA_AMPUTACAO, TEMPO FROM INFORMACOES WHERE FICHA_ID = ?`,
      [ficha_id]
    );

    const localizacao = await getQuery(
      `SELECT ENDERECO, N_ENDERECO, CEP, BAIRRO, CIDADE, ESTADO FROM LOCALIZACAO WHERE FICHA_ID = ?`,
      [ficha_id]
    );

    const observacoes = await getQuery(
      `SELECT PROTESE, ORTESE, COLETE, PALMILHA, VERSO FROM OBSERVACOES WHERE FICHA_ID = ?`,
      [ficha_id]
    );

    const produtos = await allQuery(
      `SELECT PRODUTO, TIPO FROM PRODUTOS WHERE FICHA_ID = ?`,
      [ficha_id]
    );

    const tipos = await allQuery(
      `SELECT PE, JOELHO, QUADRIL, ENCAIXE, LINER, N_LINER FROM TIPOS WHERE FICHA_ID = ?`,
      [ficha_id]
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
      const ficha = produto.ficha_id;
      if (!acc[ficha]) acc[ficha] = [];
      acc[ficha].push(produto);
      return acc;
    }, {});

    const pacientesComProdutos = pacientes.map((paciente) => ({
      ...paciente,
      produtos: produtosPorFicha[paciente.ficha_id] || [],
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
