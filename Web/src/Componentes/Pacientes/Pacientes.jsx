import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { buscarDadosFicha } from "../../api/api";
import Pesquisa from "./Pesquisa";
import ListaPacientes from "./ListaPacientes";
import Botao from "../Compartilhados/Botao";

function Pacientes() {
  const navigate = useNavigate();
  const [nFicha, setNFicha] = useState(null);

  const handleBuscar = async () => {
    const resposta = await buscarDadosFicha(nFicha);
    sessionStorage.setItem("dados", JSON.stringify(resposta.dados));
    navigate("/ficha");
  };

  return (
    <div className="h-screen w-screen bg-slate-400 flex justify-center items-center flex-row">
      <div className="relative bottom-[17em] left-16 flex flex-col justify-center space-y-4">
        <Link to={"/"}>
          <Botao conteudo={"Voltar"} />
        </Link>
      </div>

      <div className=" h-[50em] w-[70em] flex flex-col items-center p-2 space-y-4">
        <Pesquisa />
        <ListaPacientes setNFicha={setNFicha} />
      </div>

      <div className="relative bottom-[17em] flex flex-col justify-center space-y-4 right-16">
        <Botao conteudo={"Ver ou \nAtualizar ficha"} onClick={handleBuscar} />
      </div>
    </div>
  );
}

export default Pacientes;
