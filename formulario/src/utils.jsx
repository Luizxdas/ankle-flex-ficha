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
    } else {
      console.log("Input não encontrado de id:", key);
    }
  });
};

export const checarObrigatorio = (lado) => {
  if (lado === "frente") {
    const n_ficha_paciente = document.getElementById("n_ficha_paciente");
    const nome_paciente = document.getElementById("nome_paciente");
    const data_ficha = document.getElementById("data_ficha");

    if (
      !n_ficha_paciente.value.trim() ||
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
    const n_ficha_paciente = document.getElementById("n_ficha_paciente");
    if (!n_ficha_paciente.value.trim()) {
      alert("O campo de número da ficha precisa estar preenchido!");
      return false;
    }

    return true;
  }
};

export const salvarFicha = (formRef, lado) => {
  if (checarObrigatorio(lado)) {
    const formData = new FormData(formRef.current);
    const dados = Object.fromEntries(formData.entries());

    sessionStorage.setItem(
      `${lado === "frente" ? "formFrente" : "formVerso"}`,
      JSON.stringify(dados)
    );
    return true;
  } else {
    return false;
  }
};

export const limparFicha = (formRef, lado) => {
  if (!formRef?.current || !lado) {
    console.error("formRef ou lado não definidos: ");
    return;
  }

  lado === "frente"
    ? sessionStorage.removeItem("formFrente")
    : sessionStorage.removeItem("formVerso");

  const inputs = formRef.current.querySelectorAll("input");
  inputs.forEach((input) => {
    input.value = "";
  });
};
