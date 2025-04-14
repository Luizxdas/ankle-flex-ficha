import { useEffect, useRef, useState } from "react";
import { buscarDadosPaciente } from "../../../api/api";
import { enviarDados } from "../Utils/versoUtils";

const useVersoForm = (pacienteRef, pathname) => {
  const [dados, setDados] = useState(null);
  const dadosFormRef = useRef({});

  useEffect(() => {
    const n_ficha_paciente = sessionStorage.getItem("n_ficha_paciente");

    if (n_ficha_paciente && pacienteRef?.current) {
      pacienteRef.current.value = n_ficha_paciente;
      console.log("Número do paciente atualizado no input!");
    } else if (!pacienteRef?.current) {
      console.log("Ref do input não encontrada!");
    } else if (!n_ficha_paciente) {
      console.log("Número do paciente não encontrado no sessionStorage!");
    } else {
      console.log("Erro desconhecido!");
    }
  }, [pacienteRef, pathname]);

  const preencherFormulario = (dados, formRef) => {
    if (!formRef?.current) return;

    const dadosParaPreencher = dados.data;

    Object.entries(dadosParaPreencher).forEach(([key, value]) => {
      const input = formRef.current.querySelector(`#${key}`);
      if (input) {
        input.value = value;
      } else {
        console.log("Input não encontrado de id: ", key);
      }
    });
  };

  const buscarPaciente = async (n_ficha_paciente, formRef, lado) => {
    try {
      const resultado = await buscarDadosPaciente(n_ficha_paciente, lado);
      if (resultado) {
        setDados(resultado);
        preencherFormulario(resultado, formRef);
      }
    } catch (error) {
      console.error("Erro ao buscar paciente:", error);
    }
  };

  const salvarPaciente = (n_ficha_paciente, formRef) => {
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

  return {
    db: {
      buscarPaciente,
      salvarPaciente,
      dados,
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
