export const inputStyle = "h-[1.5em] ml-[4px] uppercase";
export const vFormStyle = "w-[15em] border-[1.5px] border-black rounded-md";
export const baseFormStyle =
  "h-[31em] rounded-md select-none text-start divide-y";

export const preencherFormulario = (dados, formRef) => {
  if (!formRef?.current || !dados) return;

  Object.entries(dados).forEach(([key, value]) => {
    const input = formRef.current.querySelector(`#${key}`);
    if (input) {
      input.value = value;
    } else if (!key === "produto") {
      console.log("Input não encontrado de id:", key);
    }
  });
};

export const checarObrigatorio = (lado) => {
  if (lado === "frente") {
    const n_ficha = document.getElementById("n_ficha");
    const nome_paciente = document.getElementById("nome_paciente");
    const data_ficha = document.getElementById("data_ficha");

    if (
      !n_ficha.value.trim() ||
      !nome_paciente.value.trim() ||
      !data_ficha.value.trim()
    ) {
      alert(
        "Os campos de número da ficha, nome do paciente e data da ficha precisam estar todos preenchidos!"
      );
      return false;
    }

    return true;
  } else if (lado === "verso") {
    const n_ficha = document.getElementById("n_ficha");
    if (!n_ficha.value.trim()) {
      alert("O campo de número da ficha precisa estar preenchido!");
      return false;
    }

    return true;
  }
};

export const guardarFicha = (formRef, lado) => {
  if (!formRef?.current || !lado) {
    console.log("formRef ou lado não recebidos: ", formRef, lado);
    return false;
  }

  const formData = new FormData(formRef.current);
  const novosDados = Object.fromEntries(formData.entries());

  const dadosSalvos = JSON.parse(sessionStorage.getItem("dados")) || {};

  const dadosAtualizados = {
    ...dadosSalvos,
    [lado === "frente" ? "dadosFrente" : "dadosVerso"]: {
      ...(dadosSalvos[lado === "frente" ? "dadosFrente" : "dadosVerso"] || {}),
      ...novosDados,
    },
  };

  sessionStorage.setItem("dados", JSON.stringify(dadosAtualizados));

  return true;
};

export const limparFicha = (formRef, lado) => {
  if (!formRef?.current || !lado) {
    console.error("formRef ou lado não recebidos.");
    return;
  }

  const dados = JSON.parse(sessionStorage.getItem("dados")) || {};

  if (lado === "frente") {
    delete dados.dadosFrente;
  } else {
    delete dados.dadosVerso;
  }

  sessionStorage.setItem("dados", JSON.stringify(dados));

  const inputs = formRef.current.querySelectorAll(
    "input, textarea, select, checkbox"
  );
  inputs.forEach((input) => {
    if (input.type === "checkbox" || input.type === "radio") {
      input.checked = false;
    } else {
      input.value = "";
    }
  });
};

export const imprimir = () => {
  window.print;
};
