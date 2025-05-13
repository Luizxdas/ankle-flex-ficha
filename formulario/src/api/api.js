export const enviarDados = async (dados) => {
  try {
    const resposta = await fetch(`http://localhost:5000/salvar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      throw new Error(resultado.message || "Erro ao salvar os dados.");
    }

    console.log("Resposta do backend: ", resultado);
    return resultado;
  } catch (error) {
    console.error("Erro ao enviar:", error.message);
    return { success: false, message: error.message };
  }
};

export const atualizarDados = async (dados) => {
  try {
    const resposta = await fetch(`http://localhost:5000/atualizar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
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

export const buscarDadosFicha = async (n_ficha) => {
  const resposta = await fetch(
    `http://localhost:5000/buscar/ficha?n_ficha=${n_ficha}`,
    {
      method: "GET",
    }
  );

  if (!resposta.ok) {
    const errorText = await resposta.text();
    throw new Error(
      `Erro ao buscar os dados dos pacientes. Status: ${resposta.status} ${resposta.statusText}. Detalhes: ${errorText}`
    );
  }

  const dados = await resposta.json();
  return dados;
};

export const buscarTodosDados = async () => {
  const resposta = await fetch(`http://localhost:5000/buscar/todos`, {
    method: "GET",
  });

  if (!resposta.ok) {
    const errorText = await resposta.text();
    throw new Error(
      `Erro ao buscar as fichas dos pacientes. Status: ${resposta.status} ${resposta.statusText}. Detalhes: ${errorText}`
    );
  }

  const dados = await resposta.json();
  return dados;
};
