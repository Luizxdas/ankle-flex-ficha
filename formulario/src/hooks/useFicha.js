import { useEffect, useState } from "react";
import { checarObrigatorio, preencherFormulario } from "../utils";
import { enviarDados } from "../api/api";
import { useNavigate } from "react-router-dom";

const useFicha = (frenteRef, versoRef) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSalvar = (setAlerta) => {
    salvarLocalmente();
    if (checarObrigatorio()) {
      enviarParaServidor();
    } else {
      setAlerta(true);
    }
  };

  const handleVoltar = () => {
    salvarLocalmente();
    navigate("/");
  };

  function formatarDados(formData) {
    const dados = {
      produtos: {},
      observacoes: {},
      verso: {},
      outros: {},
    };

    const gruposProdutos = ["ortese", "protese", "palmilha", "colete"];
    const gruposTipos = [
      "pe",
      "joelho",
      "quadril",
      "encaixe",
      "liner",
      "n_liner",
    ];

    for (const [key, value] of formData.entries()) {
      const isProduto = gruposProdutos.includes(key);
      const isTipo = gruposTipos.includes(key);
      const isObs = key.includes("obs");

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
        if (key === "n_ficha") {
          destino[key] = value;
          continue;
        }

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

  const salvarLocalmente = () => {
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

  const enviarParaServidor = () => {
    const dados = JSON.parse(sessionStorage.getItem("dados"));
    enviarDados(dados);
  };

  useEffect(() => {
    const dados = JSON.parse(sessionStorage.getItem("dados")) || "";
    if (dados) {
      preencherFormulario(dados, frenteRef);
      preencherFormulario(dados, versoRef);
    }
  }, [frenteRef, versoRef]);

  return {
    pagina: {
      handleSalvar,
      handleVoltar,
      enviarParaServidor,
      isLoading,
      error,
    },
  };
};

export default useFicha;
