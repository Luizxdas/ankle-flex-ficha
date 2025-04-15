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

  const identidade = {};
  const localizacao = {};
  const alternativas = {};

  inputs.forEach((input) => {
    const id = input.id;

    if (input.type === "text" || input.type === "number") {
      if (
        [
          "n_ficha_paciente",
          "nome_paciente",
          "numero_telefone",
          "data_ficha",
        ].includes(id)
      ) {
        identidade[id] = input.value.trim();
      } else if (
        [
          "endereco",
          "n_endereco",
          "cep",
          "bairro",
          "cidade",
          "estado",
        ].includes(id)
      ) {
        localizacao[id] = input.value.trim();
      } else {
        alternativas[id] = input.value.trim();
      }
    } else if (input.type === "checkbox") {
      const labelText = input.closest("label")?.textContent.trim();
      if (labelText) {
        const categoryElement = input
          .closest('div[class*="text-center"]')
          ?.querySelector("h1");
        const category = categoryElement
          ? categoryElement.textContent.trim()
          : "Outros";

        if (!alternativas[category]) {
          alternativas[category] = {};
        }

        alternativas[category][labelText] = input.checked;
      }
    } else if (input.tagName === "SELECT") {
      identidade[id] = input.value.trim();
    }
  });

  const formData = {
    identidade,
    localizacao,
    alternativas,
  };

  try {
    const response = await salvarDados(formData, "frente", operacao);
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
