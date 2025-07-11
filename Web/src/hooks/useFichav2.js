import { useEffect, useState } from "react";
import { atualizarDados, enviarDados } from "../api/api";
import { useNavigate } from "react-router-dom";
import { buscarDadosFicha } from "../api/api";

const useFichav2 = (formRef, setModal, formData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [listaId, setListaId] = useState({});
  const [dadosForm, setDadosForm] = useState({});
  const navigate = useNavigate();

  const handleSalvar = async () => {
    setIsLoading(true);
    setModal(true);

    const dadosFormatados = formatarDados(formData);
    const operacao = sessionStorage.getItem("operacao");

    try {
      if (operacao === "salvar") {
        console.log(dadosFormatados);
        await enviarDados(dadosFormatados);
      } else if (operacao === "atualizar") {
        console.log(dadosFormatados);

        // await atualizarDados(dadosFormatados);
      }
    } catch (error) {
      console.error("Erro durante a operação:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoltar = () => {
    navigate("/");
  };

  const onModalClose = () => {
    setModal("");
    setError(false);
  };

  const onModalConfirm = () => {
    handleSalvar();
  };

  function formatarDados(dados) {
    const tabelas = { ...dadosForm };
    tabelas["produtos"] = [];

    for (const [id, obj] of Object.entries(dados)) {
      console.log(id, obj.valor, obj.tabela);

      if (obj.valor && obj.tabela) {
        if (obj.tabela === "produtos") {
          const item = { produto: id, tipo: obj.tipo };
          tabelas["produtos"].push(item);
        } else {
          if (!tabelas[obj.tabela]) {
            tabelas[obj.tabela] = {};
          }
          tabelas[obj.tabela][id] = obj.valor;
        }
      } else {
        console.warn(
          `Campo '${id}' não pôde ser atribuído a uma tabela válida.`
        );
      }
    }

    return tabelas;
  }

  useEffect(() => {
    async function preencherFicha(ficha_link) {
      setIsLoading(true);
      const dados = await buscarDadosFicha(ficha_link);

      if (dados) {
        setDadosForm(dados);
      } else {
        console.warn("Dados inválidos para preenchimento do formulário");
        return;
      }

      console.log("Dados recebidos para preenchimento: ", dados);

      const tabelasId = {};

      const getInput = (id) => formRef.current?.querySelector(`#${id}`);
      const getProdutoInput = (nome) =>
        formRef.current?.querySelector(`input[value="${nome}"]`);

      const preencherValor = (input, valor) => {
        if (!input) {
          console.warn("Input ", input, " não encontrado para o valor:", valor);
          return false;
        }

        if (input.type === "checkbox") {
          input.checked = true;
        } else if (input.id === "informacoes_preco") {
          input.value = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(valor);
        } else {
          input.value = valor;
        }

        setIsLoading(false);
      };

      Object.entries(dados).forEach(([tabela, campo]) => {
        Object.entries(campo).forEach(([nome, valor]) => {
          if (tabela === "produtos") {
            const id = { id: valor.id };
            const produto = { [nome]: id };
            const input = getProdutoInput(valor.produto);
            tabelasId[tabela] = { ...tabelasId[tabela], ...produto };
            preencherValor(input, valor);
          } else if (nome === "id") {
            const id = { id: valor };
            tabelasId[tabela] = id;
          } else {
            const input = getInput(`${tabela}_${nome}`);
            preencherValor(input, valor);
          }
        });
      });

      console.log("Tabelas após preenchimento: ", tabelasId);
      setListaId(tabelasId);
    }

    const ficha_link = sessionStorage.getItem("ficha_link");

    if (ficha_link) {
      preencherFicha(ficha_link);
    }
  }, [formRef]);

  return {
    pagina: {
      handleSalvar,
      handleVoltar,
      onModalConfirm,
      onModalClose,
      isLoading,
      error,
      setError,
    },
  };
};

export default useFichav2;
