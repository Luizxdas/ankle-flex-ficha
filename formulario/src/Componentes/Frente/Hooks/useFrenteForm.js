import { useEffect, useRef, useState, useCallback } from "react";
import { buscarDadosPaciente } from "../../../api/api";
import { enviarDados } from "../Utils/frenteUtils";

const useFrenteForm = (pacienteRef, formRef) => {
  const [dados, setDados] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dadosFormRef = useRef({});

  const preencherFormulario = useCallback(
    (dados) => {
      if (!formRef?.current) return;

      const dadosParaPreencher = dados.data;
      console.log("useFrenteForm.js preenchendo formulário...");

      Object.entries(dadosParaPreencher).forEach(([key, value]) => {
        console.log("id input: ", key);
        const input = formRef.current.querySelector(`#${key}`);
        if (input) {
          input.value = value;
          console.log("valor do input: ", input.value);
        } else {
          console.log("Input não encontrado de id: ", key);
        }
      });
    },
    [formRef]
  );

  const buscarPaciente = useCallback(
    async (n_ficha_paciente, lado = "frente") => {
      if (!n_ficha_paciente) return;

      setIsLoading(true);
      setError(null);

      try {
        const resultado = await buscarDadosPaciente(n_ficha_paciente, lado);
        if (resultado) {
          setDados(resultado);
          preencherFormulario(resultado);
          return resultado;
        }
      } catch (error) {
        console.error("Erro ao buscar paciente:", error);
        setError(error.message || "Erro ao buscar dados do paciente");
      } finally {
        setIsLoading(false);
      }
    },
    [preencherFormulario]
  );

  const salvarPaciente = (n_ficha_paciente) => {
    if (!formRef?.current) {
      console.error("Formulário não encontrado!");
      return;
    }
    sessionStorage.setItem("n_ficha_paciente", n_ficha_paciente);
    enviarDados(formRef.current);
  };

  const imprimir = () => {
    window.print();
  };

  useEffect(() => {
    const n_ficha_paciente = sessionStorage.getItem("n_ficha_paciente");

    if (!n_ficha_paciente || !pacienteRef?.current) {
      console.log("Erro ao buscar dados do paciente no sessionStorage!");
      return;
    }

    buscarPaciente(n_ficha_paciente);
  }, [pacienteRef, buscarPaciente]);

  return {
    db: {
      buscarPaciente,
      salvarPaciente,
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

export default useFrenteForm;
