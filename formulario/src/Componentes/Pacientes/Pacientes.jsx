import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pesquisa from "./Pesquisa";
import Botao from "../Compartilhados/Botao";
import ListaPacientes from "./ListaPacientes";

function Pacientes() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-slate-400 flex justify-center items-center flex-row">
      <div className="relative bottom-[17em] left-16 flex flex-col justify-center space-y-4">
        <Link to={"/"}>
          <Botao conteudo={"Voltar"} />
        </Link>
      </div>

      <div className=" h-[50em] w-[70em] flex flex-col items-center p-2 space-y-4">
        <Pesquisa />
        <ListaPacientes />
      </div>

      <div className="relative bottom-[17em] flex flex-col justify-center space-y-4 right-16">
        <Botao
          conteudo={"Ver ou \nAtualizar ficha"}
          onClick={() => console.log("Buscando ficha para atualizar...")}
        />
      </div>
    </div>
  );
}

export default Pacientes;
