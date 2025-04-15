import { Link, useNavigate } from "react-router-dom";
import Pesquisa from "./Pesquisa";
import Botao from "../Compartilhados/Botao";
import ListaPacientes from "./ListaPacientes";
import { useState } from "react";

function Pacientes() {
  const navigate = useNavigate();
  const [ficha, setFicha] = useState(null);

  const handleAtualizar = () => {
    if (ficha) {
      sessionStorage.setItem("n_ficha_paciente", ficha);
      navigate("/");
    } else {
      alert("Nenhuma ficha selecionada! Clique para selecionar um ficha.");
    }
  };

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
        <ListaPacientes setFicha={setFicha} />
      </div>

      <div className="relative bottom-[17em] flex flex-col justify-center space-y-4 right-16">
        <Botao
          conteudo={"Ver ou \nAtualizar ficha"}
          onClick={() => handleAtualizar()}
        />
      </div>
    </div>
  );
}

export default Pacientes;
