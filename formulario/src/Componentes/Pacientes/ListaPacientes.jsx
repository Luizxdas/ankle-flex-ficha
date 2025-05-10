import { useEffect, useState } from "react";
import { buscarTodosDados } from "../../api/api";
import DadosLista from "./DadosLista";
import CabecalhoLista from "./CabecalhoLista";

function ListaPacientes({ setNFicha }) {
  const [dados, setDados] = useState([]);
  const [ativo, setAtivo] = useState(null);

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
        const resposta = await buscarTodosDados();
        setDados(resposta.dados);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    carregarDados();
  }, []);

  return (
    <div className="w-[60em] h-[45em] flex flex-col p-[6px] bg-gray-100">
      <CabecalhoLista />
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
