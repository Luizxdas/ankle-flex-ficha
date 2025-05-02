import { useEffect, useState } from "react";
import { preencherFormulario } from "../utils";

const useFicha = (frenteRef, versoRef) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const guardarDados = () => {
    if (frenteRef.current && versoRef.current) {
      const formData = new FormData();
      const frenteData = new FormData(frenteRef.current);
      const versoData = new FormData(versoRef.current);

      for (let [key, value] of frenteData.entries()) {
        formData.append(key, value);
      }

      for (let [key, value] of versoData.entries()) {
        formData.append(key, value);
      }

      const dados = formatarDados(formData);

      sessionStorage.setItem("dados", JSON.stringify(dados));
    }
  };

  function formatarDados(formData) {
    const dados = {
      produtos: {},
      observacoes: {},
      verso: {},
      outros: {},
    };

    const gruposProdutos = ["ortese", "protese", "palmilha", "colete"];

    for (const [key, value] of formData.entries()) {
      const isProduto = gruposProdutos.includes(key);
      const isObs = key.includes("obs");
      const isTipo = key.includes("tipo") || key.includes("n-liner");

      let destino;

      if (isObs) {
        destino = dados.observacoes;
      } else if (isProduto) {
        destino = dados.produtos;
      } else if (isTipo) {
        destino = dados.verso;
      } else {
        destino = dados.outros;
      }

      if (destino[key]) {
        if (Array.isArray(destino[key])) {
          destino[key].push(value);
        } else {
          destino[key] = [destino[key], value];
        }
      } else {
        destino[key] = value;
      }
    }

    return dados;
  }

  useEffect(() => {
    const dados = JSON.parse(sessionStorage.getItem("dados")) || "";
    if (dados) {
      preencherFormulario(dados, frenteRef);
      preencherFormulario(dados, versoRef);
    }
  }, [frenteRef, versoRef]);

  return {
    pagina: {
      guardarDados,
      isLoading,
      error,
    },
  };
};

export default useFicha;
