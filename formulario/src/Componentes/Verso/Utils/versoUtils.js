import { salvarDados } from "../../../api/api";

export const enviarDados = async (form, operacao) => {
  if (!form) {
    console.error("Formulário não foi encontrado");
    return;
  } else if (!operacao) {
    console.error("Operação não definida");
    return;
  }

  const inputs = form.querySelectorAll("input, select");

  const caracteristicas = {};
  const informacoes = {};
  const obs = {};

  inputs.forEach((input) => {
    const id = input.id;

    if (["n_ficha_paciente", "idade", "sexo", "altura", "peso"].includes(id)) {
      caracteristicas[id] = input.value.trim();
    }

    if (
      [
        "n_ficha_paciente",
        "lado",
        "n_pe",
        "causa_amputacao",
        "tempo",
        "produto",
      ].includes(id)
    ) {
      informacoes[id] = input.value.trim();
    }

    if (["n_ficha_paciente", "obs"].includes(id)) {
      obs[id] = input.value.trim();
    }
  });

  const formData = {
    caracteristicas,
    informacoes,
    obs,
  };

  try {
    const response = await salvarDados(formData, "verso", operacao);
    if (response.success) {
      alert("Dados salvos com sucesso!");
    } else {
      alert(`Erro ao salvar: ${response.message || "Erro desconhecido"}`);
      console.error("Erro detalhado:", response);
    }
  } catch (error) {
    console.error("Erro ao enviar dados:", error);
    alert(`Falha ao enviar dados: ${error.message}`);
  }
};
