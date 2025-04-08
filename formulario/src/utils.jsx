import { saveData } from "./api/api";

export const inputStyle = "h-[1.5em] ml-[4px] uppercase";
export const vFormStyle = "w-[15em] border-[1.5px] border-black rounded-md";
export const baseFormStyle =
  "h-[31em] rounded-md select-none text-start divide-y divide-black";

export const handleSubmit = async (form, setFormData) => {
  if (!form) {
    console.error("Formulário não foi encontrado");
    return;
  }

  const inputs = form.querySelectorAll("input, select");

  const info_paciente = {};
  const info_endereco = {};
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
        info_paciente[id] = input.value.trim();
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
        info_endereco[id] = input.value.trim();
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
      info_paciente[id] = input.value.trim();
    }
  });

  const camposObrigatorios = {
    nome_paciente: "Nome do Paciente",
    n_ficha_paciente: "Número da Ficha",
    data_ficha: "Data da Ficha",
  };

  const camposVazios = [];

  for (const [campo, nome] of Object.entries(camposObrigatorios)) {
    if (!info_paciente[campo]) {
      camposVazios.push(nome);
    }
  }

  if (camposVazios.length > 0) {
    alert(
      `Por favor, preencha os seguintes campos obrigatórios: ${camposVazios.join(
        ", "
      )}`
    );
    return;
  }

  const formData = {
    info_paciente,
    info_endereco,
    alternativas,
  };

  console.log("Dados capturados:", formData);
  setFormData(formData);

  try {
    const response = await saveData(formData);
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
