import { useEffect, useState } from "react";
import { buscarTodosDados } from "../../api/api";
import DadosLista from "./DadosLista";
import CabecalhoLista from "./CabecalhoLista";

function ListaPacientes({ setNFicha, pesquisa, produtos }) {
  const [dados, setDados] = useState([]);
  const [ativo, setAtivo] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = (item) => {
    if (ativo === item) {
      setAtivo(null);
      setNFicha(null);
    } else {
      setAtivo(item);
      setNFicha(item.N_FICHA);
    }
  };

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        const resposta = await buscarTodosDados();
        setDados(resposta.dados);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setLoading(false);
        setError(error);
      }
    };

    carregarDados();
  }, []);

  return (
    <div className="w-[60em] h-[45em] flex flex-col p-[6px] bg-gray-100">
      <CabecalhoLista />
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center ">
          <div className="flex items-center justify-center space-x-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
          </div>
        </div>
      )}
      {error && (
        <div className="w-full h-full flex justify-center items-center bg-slate-900/55">
          <div className="flex justify-center items-center rounded-md w-[27rem] h-[15rem] bg-slate-200">
            <div className="flex flex-col justify-center items-center gap-2 p-6">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 text-white text-2xl font-bold">
                ✕
              </span>
              <span className="">Erro ao buscar pacientes!</span>
              <span className="text-xl mt-1 mb-2">{error.message}</span>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2 mt-2">
        {dados
          .filter((item) => {
            const matchesPesquisa =
              pesquisa === "" ||
              item.NOME_PACIENTE.toLowerCase().includes(
                pesquisa.toLowerCase()
              ) ||
              String(item.N_FICHA).includes(pesquisa);

            const prodMap =
              item.produtos.map((p) => p.TIPO).join(", ") || "Sem produtos";

            const tiposMap = prodMap
              .split(",")
              .map((t) => t.trim().toLowerCase());

            const matchesProdutos =
              produtos.length === 0 ||
              produtos.some((tipo) => tiposMap.includes(tipo.toLowerCase()));

            return matchesPesquisa && matchesProdutos;
          })
          .map((item, index) => (
            <DadosLista
              key={item.N_FICHA}
              handleClick={handleClick}
              item={item}
              ativo={ativo}
              index={index}
            />
          ))}
      </div>
    </div>
  );
}

export default ListaPacientes;
