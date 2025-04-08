export const saveData = async (formData) => {
  try {
    const response = await fetch("http://localhost:5000/salvar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Erro ao salvar os dados.");
    }

    console.log("Resposta do backend:", result);
    return result;
  } catch (error) {
    console.error("Erro ao enviar:", error.message);
    return { success: false, message: error.message };
  }
};

export const fetchData = async (n_ficha_paciente, lado) => {
  if (!n_ficha_paciente) {
    throw new Error("Número da ficha do paciente inválido!");
  }

  const response = await fetch(
    `http://localhost:5000/buscar?nPaciente=${n_ficha_paciente}&lado=${lado}`,
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
