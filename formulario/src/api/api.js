export const salvarDados = async (dadosForm, lado) => {
  try {
    const resposta = await fetch(`http://localhost:5000/salvar/${lado}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosForm),
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      throw new Error(resultado.message || "Erro ao salvar os dados.");
    }

    console.log("Resposta do backend:", resultado);
    return resultado;
  } catch (error) {
    console.error("Erro ao enviar:", error.message);
    return { success: false, message: error.message };
  }
};

export const buscarDados = async (n_ficha_paciente, lado) => {
  if (!n_ficha_paciente) {
    throw new Error("Número da ficha do paciente inválido!");
  }

  const response = await fetch(
    `http://localhost:5000/buscar/${lado}?n_ficha_paciente=${n_ficha_paciente}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar os dados.");
  }

  const data = await response.json();

  return data;
};
