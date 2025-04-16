import { useCallback, useEffect, useRef, useState } from "react";
import { buscarDadosPaciente } from "../../../api/api";
import { enviarDados } from "../Utils/versoUtils";
import { preencherFormulario } from "../../../utils";

const useVersoForm = (pacienteRef, formRef) => {
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

  const salvarPaciente = (n_ficha_paciente, operacao) => {
    if (!formRef?.current) {
      console.error("Formulário não encontrado!");
      return;
    } else if (!n_ficha_paciente) {
      console.error("Número da ficha não encontrado!");
      return;
    } else if (!operacao) {
      console.error("Operação não definida!");
      return;
    }

    sessionStorage.setItem("n_ficha_paciente", n_ficha_paciente);
    enviarDados(formRef.current, operacao);
  };

  const imprimir = () => {
    window.print();
  };

  useEffect(() => {
    const n_ficha_paciente = sessionStorage.getItem("n_ficha_paciente");

    if (!n_ficha_paciente || !pacienteRef?.current) {
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

export default useVersoForm;
