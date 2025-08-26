import apiClient from "./apiClient";

export const enviarDados = async (dados) => {
  const resposta = await apiClient.post("/fichas", dados);
  return resposta.data;
};

export const buscarDadosFicha = async (ficha_link) => {
  const resposta = await apiClient.get(ficha_link);
  return resposta.data;
};

export const buscarTodosDados = async () => {
  const resposta = await apiClient.get("/fichas");
  return resposta.data._embedded.lista_ficha_dtolist;
};

export const login = async (username, password) => {
  try {
    const response = await apiClient.post("/auth/login", {
      username,
      password,
    });

    const access_token = response.data.access_token;

    if (access_token) {
      localStorage.setItem("accessToken", access_token);
    }

    return true;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const errorMessage = error.response.data || "Erro desconhecido.";

      if (status === 401) {
        throw new Error("Usuário ou senha inválidos.");
      } else if (status === 403) {
        throw new Error("Acesso proibido.");
      } else {
        throw new Error(`Ocorreu um erro no login: ${errorMessage}`);
      }
    } else if (error.request) {
      throw new Error("Erro de conexão. Verifique sua internet.");
    } else {
      throw new Error("Erro interno na aplicação.");
    }
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem("accessToken");
    await apiClient.post("/auth/logout");
    return true;
  } catch (error) {
    if (error.request) {
      throw new Error("Erro de conexão. Verifique sua internet.");
    } else {
      throw new Error("Erro interno na aplicação.");
    }
  }
};

export const refresh = async () => {
  try {
    const response = await apiClient.post("/auth/refresh", {});
    const new_access_token = response.data.access_token;

    if (new_access_token) {
      localStorage.setItem("accessToken", new_access_token);
      return true;
    } else {
      console.warn("Refresh bem-sucedido, mas nenhum novo token recebido.");
      return false;
    }
  } catch (error) {
    console.error("Erro na função refresh:", error);
    return false;
  }
};
