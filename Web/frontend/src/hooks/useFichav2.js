import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dadosForm from "../utils/dadosForm";
import { buscarDadosFicha, enviarDados } from "../services/fichaService";
import { formatarPreco } from "../utils/utils";

const useFichav2 = (formRef, setModal, formData, setFormData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSalvar = async () => {
    setIsLoading(true);
    setModal(true);

    const dadosFormatados = formatarDados(formData);
    console.log(dadosFormatados);

    try {
      await enviarDados(dadosFormatados);
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
    const tabelas = {};
    tabelas["produtos"] = [];

    for (const [id, obj] of Object.entries(dados)) {
      if (obj.valor) {
        if (obj.tabela === "produtos") {
          const item = { produto: id, tipo: obj.tipo };
          tabelas["produtos"].push(item);
        } else if (id === "ficha_id") {
          tabelas["identidade"][id] = obj.valor;
        } else {
          if (!tabelas[obj.tabela]) {
            tabelas[obj.tabela] = {};
          }
          id === "preco"
            ? (tabelas[obj.tabela][id] = formatarPreco(obj.valor))
            : (tabelas[obj.tabela][id] = obj.valor);
        }
      }
    }

    return tabelas;
  }

  useEffect(() => {
    async function preencherFicha(ficha_link) {
      setIsLoading(true);
      const dados = await buscarDadosFicha(ficha_link);
      setIsLoading(false);

      if (!dados) {
        console.warn("Dados inválidos para preenchimento do formulário");

        return;
      }

      const novoFormData = formData;
      const tabelasId = {};

      Object.entries(dados).forEach(([tabela, campo]) => {
        if (!campo) {
          return;
        }

        Object.entries(campo).forEach(([nome, valor]) => {
          if (tabela === "produtos") {
            const produto = valor.produto;
            novoFormData[produto].valor = true;
          } else if (nome === "id") {
            const id = { id: valor };
            tabelasId[tabela] = id;
          } else if (nome === "preco") {
            novoFormData[nome].valor = parseFloat(valor / 100).toLocaleString(
              "pt-BR",
              { style: "currency", currency: "BRL" }
            );
          } else {
            novoFormData[nome].valor = valor;
          }
        });
      });

      setFormData(novoFormData);
    }

    const ficha_link = sessionStorage.getItem("ficha_link");

    if (ficha_link) {
      preencherFicha(ficha_link);
    } else {
      setFormData(dadosForm);
    }
  }, []);

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
