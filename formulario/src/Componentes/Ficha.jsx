import Frente from "./Frente/Frente";
import Verso from "./Verso/Verso";
import Botao from "./Compartilhados/Botao";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import useFicha from "../hooks/useFicha";
import { enviarDados } from "../api/api";

function Ficha() {
  const navigate = useNavigate();
  const frenteRef = useRef();
  const versoRef = useRef();
  const [nFicha, setNFicha] = useState("");
  const { pagina } = useFicha(frenteRef, versoRef);

  const handleSalvar = () => {
    let dados = JSON.parse(sessionStorage.getItem("dados")) || "";
    if (dados) {
      enviarDados(dados);
      alert("Dados enviados!");
    } else {
      pagina.guardarDados();
      dados = JSON.parse(sessionStorage.getItem("dados"));
      enviarDados(dados);
      alert("Dados enviado!");
    }
  };

  const handleVoltar = () => {
    pagina.guardarDados();
    navigate("/");
  };

  return (
    <div className=" bg-slate-400 flex flex-row items-center justify-center">
      <div className="print:hidden relative right-44">
        <div className="fixed top-10">
          <div className="flex flex-col space-y-4">
            <Botao conteudo={"Voltar"} onClick={handleVoltar} />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="print:hidden mt-8"></div>
        <div className="w-[297mm] h-[200mm]">
          <Frente frenteRef={frenteRef} nFicha={nFicha} setNFicha={setNFicha} />
        </div>
        <div className="print:hidden my-12"></div>
        <div className="page-break w-[297mm] h-[200mm]">
          <Verso versoRef={versoRef} nFicha={nFicha} setNFicha={setNFicha} />
        </div>
        <div className="print:hidden mb-12"></div>
      </div>

      <div className="print:hidden relative">
        <div className="ml-8 fixed top-10">
          <div className="flex flex-col space-y-4">
            <Botao conteudo={"Salvar"} onClick={handleSalvar} />
            <Botao conteudo={"Imprimir"} onClick={() => window.print()} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ficha;
