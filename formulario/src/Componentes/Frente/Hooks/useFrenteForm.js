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

  const buscarPaciente = async (nPaciente) => {
    try {
      const resultado = await fetchData(nPaciente);
      if (resultado) {
        setDados(resultado);
        console.log("Dados do paciente recebidos:", resultado);
      }

      return dados;
    } catch (error) {
      console.error("Erro ao buscar paciente:", error);
    }
  };

  const salvarPaciente = (nPaciente, formRef) => {
    if (!formRef?.current) {
      console.error("Formulário não encontrado!");
      return;
    }

    sessionStorage.setItem("nPaciente", nPaciente);
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
