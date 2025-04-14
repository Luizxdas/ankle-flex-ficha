import { Link } from "react-router-dom";
import Pesquisa from "./Pesquisa";
import Botao from "../Compartilhados/Botao";
import ListaPacientes from "./ListaPacientes";

function Pacientes() {
  return (
    <div className="h-screen w-screen bg-slate-400 flex justify-center items-center flex-row">
      <div className="relative bottom-[14em] left-16 flex flex-col justify-center space-y-4">
        <Link to={"/verso"}>
          <Botao conteudo={"Ir para o verso"} />
        </Link>
        <Link to={"/"}>
          <Botao conteudo={"Ir para a frente"} />
        </Link>
      </div>

      <div className=" h-[50em] w-[70em] flex flex-col items-center p-2 space-y-4">
        <Pesquisa />
        <ListaPacientes />
      </div>
    </div>
  );
}

export default Pacientes;
