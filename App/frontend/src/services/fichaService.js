import axios from "axios";
import qs from "qs";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
    paramsSerializer: params => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
    }
});

export const salvarDados = async (dados) => {
  const resposta = await apiClient.post("/fichas", dados);
  return resposta.data;
};

export const atualizarDados = async (dados) => {
    const resposta = await apiClient.put("/fichas", dados);
    return resposta.data;
}

export const buscarDadosFicha = async (ficha_link) => {
  const resposta = await apiClient.get(ficha_link);
  return resposta.data;
};

export const buscarDadosPaginados = async (page = 0, size = 10, pesquisa, tipos) => {

    const params = {
        page,
        size,
        pesquisa,
        tipos
    };


    return await apiClient.get(`/fichas`, {params});
};
