import { Link } from "react-router-dom";
import Pesquisa from "./Pesquisa";

function Pacientes() {
  return (
    <div className="h-screen w-screen bg-slate-400 flex justify-center items-center flex-row">
      <div className="flex flex-col justify-center space-y-4">
        <Link to={"/verso"}>
          <button className="relative flex justify-center items-center p-4 text-center right-[1em] bottom-[22em] rounded-md bg-slate-500 shadow-xl w-35 h-20 text-white">
            Ir para o verso
          </button>
        </Link>
        <Link to={"/"}>
          <button className="relative flex justify-center items-center p-4 text-center right-[1em] bottom-[22em] rounded-md bg-slate-500 shadow-xl w-35 h-20 text-white">
            Ir para a frente
          </button>
        </Link>
      </div>

      <div className="bg-white shadow-md border border-gray-300 h-[50em] w-[70em]">
        <Pesquisa />
      </div>
    </div>
  );
}

export default Pacientes;
