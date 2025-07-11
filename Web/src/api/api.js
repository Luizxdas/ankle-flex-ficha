const getBasicAuthHeaders = () => {
  const username = "user";
  const password = "1234";
  const auth = btoa(`${username}:${password}`);
  return {
    "Content-Type": "application/json",
    Authorization: `Basic ${auth}`,
  };
};

export const enviarDados = async (dados) => {
  try {
    const resposta = await fetch(`http://localhost:8080/fichas`, {
      method: "POST",
      headers: getBasicAuthHeaders(),
      body: JSON.stringify(dados),
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      throw new Error(resultado.message || "Erro ao salvar os dados.");
    }

    return resultado;
  } catch (error) {
    console.error("Erro ao enviar:", error.message);
    throw error;
  }
};

export const atualizarDados = async (dados) => {
  try {
    const resposta = await fetch(`http://localhost:8080/fichas`, {
      method: "PUT",
      headers: getBasicAuthHeaders(),
      body: JSON.stringify(dados),
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      throw new Error(resultado.message || "Erro ao salvar os dados.");
    }

    return resultado;
  } catch (error) {
    console.error("Erro ao enviar:", error.message);
    throw error;
  }
};

export const buscarDadosFicha = async (ficha_link) => {
  const username = "user";
  const password = "1234";

  const auth = btoa(`${username}:${password}`);

  const resposta = await fetch(ficha_link, {
    method: "GET",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
  });

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
  const resposta = await fetch(`http://localhost:8080/fichas`, {
    method: "GET",
    headers: getBasicAuthHeaders(),
  });

  if (!resposta.ok) {
    const errorText = await resposta.text();
    throw new Error(
      `Erro ao buscar as fichas dos pacientes. Status: ${resposta.status} ${resposta.statusText}. Detalhes: ${errorText}`
    );
  }

  const data = await resposta.json();

  return data._embedded.lista_ficha_dtolist;
};
