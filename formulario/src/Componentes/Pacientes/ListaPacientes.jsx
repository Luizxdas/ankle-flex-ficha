import { useEffect, useState } from "react";
import { buscarTodosDados } from "../../api/api";
import DadosLista from "./DadosLista";
import CabecalhoLista from "./CabecalhoLista";

function ListaPacientes({ setNFicha }) {
  const [dados, setDados] = useState([]);
  const [ativo, setAtivo] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
        setError(true);
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
          <div className="text-3xl bg-slate-400 w-[15em] h-[8em] flex justify-center rounded-md shadow-lg">
            <span className="mt-12">Erro ao carregar os dados!</span>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2 mt-2">
        {dados.map((item, index) => (
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
