import { db } from "../config/database.js";

async function runQuery(query, params = []) {
  const client = await db.connect();
  try {
    const result = await client.query(query, params);
    return result;
  } finally {
    client.release();
  }
}

async function getQuery(query, params = []) {
  const result = await runQuery(query, params);
  return result.rows[0];
}

async function allQuery(query, params = []) {
  const result = await runQuery(query, params);
  return result.rows;
}

export async function checarFichaExistente(n_ficha) {
  try {
    const row = await getQuery(
      `SELECT N_FICHA FROM IDENTIDADE WHERE N_FICHA = $1`,
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
  const n_ficha =
    dados.identidade.n_ficha_frente || dados.identidade.n_ficha_verso;

  if (!n_ficha) {
    return res.status(400).json({
      success: false,
      message: "Número da ficha não fornecido.",
    });
  }

  const client = await db.connect();

  try {
    const fichaExiste = await checarFichaExistente(n_ficha);
    if (fichaExiste) {
      return res.status(409).json({
        success: false,
        message: "Uma ficha com esse número já existe no banco de dados.",
      });
    }

    await client.query("BEGIN");

    try {
      await client.query(
        `INSERT INTO IDENTIDADE (N_FICHA, NOME_PACIENTE, DATA_FICHA, TELEFONE)
         VALUES ($1, $2, $3, $4)`,
        [
          n_ficha,
          dados.identidade.nome_paciente,
          dados.identidade.data_ficha,
          dados.identidade.telefone,
        ]
      );

      await client.query(
        `INSERT INTO LOCALIZACAO (N_FICHA, ENDERECO, N_ENDERECO, CEP, BAIRRO, CIDADE, ESTADO)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          n_ficha,
          dados.localizacao.endereco,
          dados.localizacao.n_endereco,
          dados.localizacao.cep,
          dados.localizacao.bairro,
          dados.localizacao.cidade,
          dados.localizacao.estado,
        ]
      );

      await client.query(
        `INSERT INTO CARACTERISTICAS (N_FICHA, IDADE, SEXO, ALTURA, PESO)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          n_ficha,
          dados.caracteristicas.idade,
          dados.caracteristicas.sexo,
          dados.caracteristicas.altura,
          dados.caracteristicas.peso,
        ]
      );

      await client.query(
        `INSERT INTO INFORMACOES (N_FICHA, LADO, N_PE, CAUSA_AMPUTACAO, TEMPO, PRECO, DATA_ENTREGA)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          n_ficha,
          dados.informacoes.lado,
          dados.informacoes.n_pe,
          dados.informacoes.causa_amputacao,
          dados.informacoes.tempo,
          dados.informacoes.preco,
          dados.informacoes.data_entrega,
        ]
      );

      await client.query(
        `INSERT INTO TIPOS (N_FICHA, PE, JOELHO, QUADRIL, ENCAIXE, LINER, N_LINER)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          n_ficha,
          dados.tipos.pe,
          dados.tipos.joelho,
          dados.tipos.quadril,
          dados.tipos.encaixe,
          dados.tipos.liner,
          dados.tipos.n_liner,
        ]
      );

      await client.query(
        `INSERT INTO OBSERVACOES (N_FICHA, PROTESE, ORTESE, COLETE, PALMILHA, VERSO)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          n_ficha,
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
            await client.query(
              `INSERT INTO PRODUTOS (N_FICHA, PRODUTO, TIPO) VALUES ($1, $2, $3)`,
              [n_ficha, valorProduto, tipo]
            );
          }
        }
      }

      await client.query("COMMIT");
      console.log("Dados salvos com sucesso!");
      return res.json({ success: true, id: n_ficha });
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Erro durante as operações:", error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  } catch (error) {
    console.error("Erro ao salvar ficha:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  } finally {
    client.release();
  }
}

export async function atualizarFicha(req, res) {
  const dados = req.body;
  const n_ficha =
    dados.identidade.n_ficha_frente || dados.identidade.n_ficha_verso;

  if (!n_ficha) {
    return res.status(400).json({
      success: false,
      message: "Número da ficha não fornecido.",
    });
  }

  const client = await db.connect();

  try {
    const fichaExiste = await checarFichaExistente(n_ficha);
    if (!fichaExiste) {
      return res.status(404).json({
        success: false,
        message: "Ficha com esse número não encontrada no banco de dados.",
      });
    }

    await client.query("BEGIN");

    try {
      await client.query(
        `UPDATE IDENTIDADE SET 
          NOME_PACIENTE = $1,
          DATA_FICHA = $2,
          TELEFONE = $3
         WHERE N_FICHA = $4`,
        [
          dados.identidade.nome_paciente,
          dados.identidade.data_ficha,
          dados.identidade.telefone,
          n_ficha,
        ]
      );

      await client.query(
        `UPDATE LOCALIZACAO SET
          ENDERECO = $1,
          N_ENDERECO = $2,
          CEP = $3,
          BAIRRO = $4,
          CIDADE = $5,
          ESTADO = $6
         WHERE N_FICHA = $7`,
        [
          dados.localizacao.endereco,
          dados.localizacao.n_endereco,
          dados.localizacao.cep,
          dados.localizacao.bairro,
          dados.localizacao.cidade,
          dados.localizacao.estado,
          n_ficha,
        ]
      );

      await client.query(
        `UPDATE CARACTERISTICAS SET
          IDADE = $1,
          SEXO = $2,
          ALTURA = $3,
          PESO = $4
         WHERE N_FICHA = $5`,
        [
          dados.caracteristicas.idade,
          dados.caracteristicas.sexo,
          dados.caracteristicas.altura,
          dados.caracteristicas.peso,
          n_ficha,
        ]
      );

      await client.query(
        `UPDATE INFORMACOES SET
          LADO = $1,
          N_PE = $2,
          CAUSA_AMPUTACAO = $3,
          TEMPO = $4,
          PRECO = $5,
          DATA_ENTREGA = $6
         WHERE N_FICHA = $7`,
        [
          dados.informacoes.lado,
          dados.informacoes.n_pe,
          dados.informacoes.causa_amputacao,
          dados.informacoes.tempo,
          dados.informacoes.preco,
          dados.informacoes.data_entrega,
          n_ficha,
        ]
      );

      await client.query(`DELETE FROM PRODUTOS WHERE N_FICHA = $1`, [n_ficha]);

      if (dados.produtos && typeof dados.produtos === "object") {
        for (const [tipo, produto] of Object.entries(dados.produtos)) {
          const valorProduto = Array.isArray(produto)
            ? JSON.stringify(produto)
            : produto;

          if (tipo) {
            await client.query(
              `INSERT INTO PRODUTOS (N_FICHA, PRODUTO, TIPO) VALUES ($1, $2, $3)`,
              [n_ficha, valorProduto, tipo]
            );
          }
        }
      }

      await client.query(`DELETE FROM TIPOS WHERE N_FICHA = $1`, [n_ficha]);
      await client.query(
        `INSERT INTO TIPOS (N_FICHA, PE, JOELHO, QUADRIL, ENCAIXE, LINER, N_LINER)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          n_ficha,
          dados.tipos.pe,
          dados.tipos.joelho,
          dados.tipos.quadril,
          dados.tipos.encaixe,
          dados.tipos.liner,
          dados.tipos.n_liner,
        ]
      );

      await client.query(
        `UPDATE OBSERVACOES SET
          PROTESE = $1,
          ORTESE = $2,
          COLETE = $3,
          PALMILHA = $4,
          VERSO = $5
         WHERE N_FICHA = $6`,
        [
          dados.observacoes.protese,
          dados.observacoes.ortese,
          dados.observacoes.colete,
          dados.observacoes.palmilha,
          dados.observacoes.verso,
          n_ficha,
        ]
      );

      await client.query("COMMIT");
      console.log("Ficha atualizada com sucesso!");
      return res.json({ success: true, id: n_ficha });
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Erro durante a atualização:", error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  } catch (error) {
    console.error("Erro ao atualizar ficha:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  } finally {
    client.release();
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
      `SELECT * FROM IDENTIDADE WHERE N_FICHA = $1`,
      [n_ficha]
    );

    if (!identidade) {
      return res.status(404).json({
        success: false,
        message: "Paciente não encontrado",
      });
    }

    const caracteristicas = await getQuery(
      `SELECT IDADE, SEXO, ALTURA, PESO FROM CARACTERISTICAS WHERE N_FICHA = $1`,
      [n_ficha]
    );

    const informacoes = await getQuery(
      `SELECT LADO, N_PE, CAUSA_AMPUTACAO, TEMPO, PRECO, DATA_ENTREGA FROM INFORMACOES WHERE N_FICHA = $1`,
      [n_ficha]
    );

    const localizacao = await getQuery(
      `SELECT ENDERECO, N_ENDERECO, CEP, BAIRRO, CIDADE, ESTADO FROM LOCALIZACAO WHERE N_FICHA = $1`,
      [n_ficha]
    );

    const observacoes = await getQuery(
      `SELECT PROTESE, ORTESE, COLETE, PALMILHA, VERSO FROM OBSERVACOES WHERE N_FICHA = $1`,
      [n_ficha]
    );

    const produtos = await allQuery(
      `SELECT PRODUTO, TIPO FROM PRODUTOS WHERE N_FICHA = $1`,
      [n_ficha]
    );

    const tipos = await allQuery(
      `SELECT PE, JOELHO, QUADRIL, ENCAIXE, LINER, N_LINER FROM TIPOS WHERE N_FICHA = $1`,
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
      const ficha = produto.n_ficha;
      if (!acc[ficha]) acc[ficha] = [];
      acc[ficha].push(produto);
      return acc;
    }, {});

    const pacientesComProdutos = pacientes.map((paciente) => ({
      ...paciente,
      produtos: produtosPorFicha[paciente.n_ficha] || [],
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
