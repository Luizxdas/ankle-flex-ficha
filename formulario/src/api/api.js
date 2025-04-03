export const saveData = async (formData) => {
  console.log("Enviando para o backend:", formData);

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
