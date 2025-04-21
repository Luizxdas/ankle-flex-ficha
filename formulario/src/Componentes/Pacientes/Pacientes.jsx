import { Link, useNavigate } from "react-router-dom";
import Pesquisa from "./Pesquisa";
import Botao from "../Compartilhados/Botao";
import ListaPacientes from "./ListaPacientes";
import { useState } from "react";
import { buscarDadosPaciente } from "../../api/api";

function Pacientes() {
  const navigate = useNavigate();
  const [ficha, setFicha] = useState(null);

  const handleAtualizar = async () => {
    if (ficha) {
      const dados = await buscarDadosPaciente(ficha);
      sessionStorage.setItem(
        "formFrente",
        JSON.stringify(dados.data.dadosFrente)
      );
      sessionStorage.setItem(
        "formVerso",
        JSON.stringify(dados.data.dadosVerso)
      );
      sessionStorage.setItem("operacao", "atualizar");
      navigate("/ficha?lado=frente");
    } else {
      alert("Nenhuma ficha selecionada! Clique para selecionar um ficha.");
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-400 flex justify-center items-center flex-row">
      <div className="relative bottom-[14em] left-16 flex flex-col justify-center space-y-4">
        <Link to={"/"}>
          <Botao conteudo={"Voltar"} />
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
