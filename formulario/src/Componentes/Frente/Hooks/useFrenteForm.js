import { useEffect, useRef, useState } from "react";
import { fetchData } from "../../../api/api";
import { handleSubmit } from "../../../utils";

const useFrenteForm = (pacienteRef, pathname) => {
  const [dados, setDados] = useState(null);
  const dadosFormRef = useRef({});

  useEffect(() => {
    const idPaciente = sessionStorage.getItem("nPaciente");

    if (idPaciente && pacienteRef?.current) {
      pacienteRef.current.value = idPaciente;
      console.log("Número do paciente atualizado no input!");
    } else if (!pacienteRef?.current) {
      console.log("Ref do input não encontrada!");
    } else if (!idPaciente) {
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
      const resultado = await fetchData(n_ficha_paciente, lado);
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

    sessionStorage.setItem("nPaciente", n_ficha_paciente);
    handleSubmit(formRef.current, (data) => {
      dadosFormRef.current = data;
    });
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

export default useFrenteForm;
