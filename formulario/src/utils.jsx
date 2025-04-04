import { saveData } from "./api/api";

export const inputStyle = "h-[1.5em] ml-[4px] uppercase";
export const vFormStyle = "w-[15em] border-[1.5px] border-black rounded-md";
export const baseFormStyle =
  "h-[31em] rounded-md select-none text-start divide-y divide-black`}";

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
      if (["paciente", "nPaciente", "telefone", "data"].includes(id)) {
        info_paciente[id] = input.value;
      } else if (
        ["endereco", "numero", "cep", "bairro", "cidade", "estado"].includes(id)
      ) {
        info_endereco[id] = input.value;
      } else {
        alternativas[id] = input.value;
      }
    } else if (input.type === "checkbox") {
      const labelText = input.closest("label")?.textContent.trim();
      if (labelText) {
        const category =
          input.closest('div[class*="text-center"]')?.querySelector("h1")
            ?.textContent || "Outros";

        if (!alternativas[category]) {
          alternativas[category] = {};
        }

        alternativas[category][labelText] = input.checked;
      }
    } else if (input.tagName === "SELECT") {
      info_paciente[id] = input.value;
    }
  });

  const formData = {
    info_paciente,
    info_endereco,
    alternativas,
  };

  console.log("Dados capturados:", formData);
  setFormData(formData);

  const response = await saveData(formData);
  if (response.success) {
    alert("Dados salvos com sucesso!");
  } else {
    alert("Erro: " + response.message);
  }
};
