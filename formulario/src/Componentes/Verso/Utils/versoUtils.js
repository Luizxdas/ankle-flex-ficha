import { salvarDados } from "../../../api/api";
import { checarObrigatorio, salvarFicha } from "../../../utils";

export const enviarDados = async (formRef, operacao) => {
  if (!operacao) {
    console.error("Operação não definida!");
  }

  salvarFicha(formRef, "verso");

  const frenteRaw = sessionStorage.getItem("formFrente");
  const versoRaw = sessionStorage.getItem("formVerso");

  if (!frenteRaw || !versoRaw || !checarObrigatorio("verso")) {
    alert("Dados do formulário incompletos.");
    return;
  }

  const formFrente = JSON.parse(frenteRaw);
  const formVerso = JSON.parse(versoRaw);

  const dados = {
    ...formFrente,
    ...formVerso,
  };

  try {
    const response = await salvarDados(dados, operacao);
    if (response.success) {
      operacao === "salvar"
        ? alert("Dados salvos com sucesso!")
        : alert("Dados atualizados com sucesso!");
    } else {
      alert(`Erro ao ${operacao}: ${response.message || "Erro desconhecido"}`);
      console.error("Erro detalhado:", response);
    }
  } catch (error) {
    console.error("Erro ao enviar dados:", error);
    alert(`Falha ao enviar dados: ${error.message}`);
  }
};
