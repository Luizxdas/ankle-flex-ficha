import { useEffect, useState } from "react";
import { atualizarDados, enviarDados } from "../api/api";
import { useNavigate } from "react-router-dom";
import { buscarDadosFicha } from "../api/api";

const useFichav2 = (formRef, setModal, setNFicha) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSalvar = () => {
    const formData = new FormData(formRef.current);
    const dados = Object.fromEntries(formData.entries());

    const dadosFormatados = formatarDados(dados);

    const operacao = sessionStorage.getItem("operacao");

    if (operacao === "salvar") {
      enviarDados(dadosFormatados);
    } else if (operacao === "atualizar") {
      atualizarDados(dadosFormatados);
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
    const tabelas = {
      caracteristicas: {},
      identidade: {},
      informacoes: {},
      localizacao: {},
      observacoes: {},
      produtos: {},
      tipos: {},
    };
    const camposNumericos = [
      "n_ficha",
      "idade",
      "altura",
      "peso",
      "preco",
      "n_endereco",
      "n_liner",
    ];

    for (const [name, valor] of Object.entries(dados)) {
      const [tabela, ...resto] = name.split("_");
      const campo = resto.join("_");

      if (Object.hasOwn(tabelas, tabela) && campo) {
        if (valor === "") {
          tabelas[tabela][campo] = null;
        } else if (campo === "preco") {
          let valorLimpo = valor.replace(/[^\d,]/g, "");
          valorLimpo = valorLimpo.replace(/,/g, ".");
          const preco = parseFloat(valorLimpo);
          tabelas[tabela][campo] = preco.toFixed(2);
        } else if (camposNumericos.includes(campo)) {
          const numeros = valor.replace(/\D/g, "");
          tabelas[tabela][campo] = Number(numeros);
        } else {
          tabelas[tabela][campo] = valor;
        }
      } else {
        console.warn(
          `Campo '${name}' não pôde ser atribuído a uma tabela válida.`
        );
      }
    }

    return tabelas;
  }

  useEffect(() => {
    async function preencherFicha(n_ficha) {
      setIsLoading(true);
      const resultado = await buscarDadosFicha(n_ficha);
      const dados = resultado.dados;

      if (!dados) {
        console.warn("Dados inválidos para preenchimento do formulário");
        return;
      }

      const getInput = (id) => formRef.current?.querySelector(`#${id}`);
      const getProduto = (nome) =>
        formRef.current?.querySelector(`input[value="${nome}"]`);

      const preencherValor = (input, valor) => {
        if (!input) {
          console.warn(
            `Input (${input}) não encontrado para o valor: ${valor}`
          );
          return false;
        }

        if (input.type === "checkbox") {
          input.checked = true;
        } else if (
          input.id === "identidade_data_ficha" ||
          input.id === "informacoes_data_entrega"
        ) {
          const data_formatada = new Date(valor).toLocaleDateString();
          input.value = data_formatada;
        } else if (input.id === "informacoes_preco" && valor) {
          let preco = valor.replace(/\D/g, "");
          const valorNumerico = parseFloat(preco) / 100;
          input.value = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(valorNumerico);
        } else {
          input.value = valor;
        }

        setIsLoading(false);
      };

      Object.entries(dados).forEach(([tabela, campo]) => {
        Object.entries(campo).forEach(([id, valor]) => {
          if (tabela === "produtos") {
            const input = getProduto(valor.produto);
            preencherValor(input);
          } else if (tabela === "tipos") {
            Object.entries(valor).forEach(([tipo, descricao]) => {
              const input = getInput(`${tabela}_${tipo}`);
              preencherValor(input, descricao);
            });
          } else {
            if (id === "n_ficha") {
              setNFicha(valor);
              return;
            }

            const input = getInput(`${tabela}_${id}`);
            preencherValor(input, valor);
          }
        });
      });
    }

    const n_ficha = sessionStorage.getItem("n_ficha");

    if (n_ficha) {
      preencherFicha(n_ficha);
    }
  }, [formRef, setNFicha]);

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
