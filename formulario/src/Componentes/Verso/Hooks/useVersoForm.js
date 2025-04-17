import { useCallback, useEffect, useRef, useState } from "react";
import { buscarDadosPaciente } from "../../../api/api";
import { preencherFormulario } from "../../../utils";

const useVersoForm = (formRef, setFicha) => {
  const [dados, setDados] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dadosFormRef = useRef({});

  const buscarPaciente = useCallback(
    async (n_ficha_paciente, lado = "verso") => {
      if (!n_ficha_paciente) return;

      setIsLoading(true);
      setError(null);

      try {
        const resultado = await buscarDadosPaciente(n_ficha_paciente, lado);
        if (resultado) {
          setDados(resultado);
          preencherFormulario(resultado, formRef);
          return resultado;
        }
      } catch (error) {
        console.error("Erro ao buscar paciente:", error);
        setError(error.message || "Erro ao buscar dados do paciente");
      } finally {
        setIsLoading(false);
      }
    },
    [formRef]
  );

  const imprimir = () => {
    window.print();
  };

  useEffect(() => {
    const fichaFrente = JSON.parse(sessionStorage.getItem("formFrente"));
    const formPaciente = JSON.parse(sessionStorage.getItem("formVerso"));

    if (formPaciente) {
      preencherFormulario(formPaciente, formRef);
    }

    if (fichaFrente && setFicha) {
      setFicha(fichaFrente.n_ficha_paciente);
    }
  }, [formRef, setFicha]);

  return {
    db: {
      buscarPaciente,
      dados,
      isLoading,
      error,
    },
    pagina: {
      imprimir,
    },
    refs: {
      dadosFormRef,
    },
  };
};

export default useVersoForm;
