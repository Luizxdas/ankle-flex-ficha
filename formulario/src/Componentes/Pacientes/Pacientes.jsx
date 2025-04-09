import { Link } from "react-router-dom";
import Pesquisa from "./Pesquisa";
import Botao from "../Compartilhados/Botao";

function Pacientes() {
  return (
    <div className="h-screen w-screen bg-slate-400 flex justify-center items-center flex-row">
      <div className="relative bottom-[19em] mr-3 flex flex-col justify-center space-y-4">
        <Link to={"/verso"}>
          <Botao conteudo={"Ir para o verso"} />
        </Link>
        <Link to={"/"}>
          <Botao conteudo={"Ir para a frente"} />
        </Link>
      </div>

      <div className="bg-white shadow-md border border-gray-300 h-[50em] w-[70em]">
        <Pesquisa />
      </div>
    </div>
  );
}

export default Pacientes;
