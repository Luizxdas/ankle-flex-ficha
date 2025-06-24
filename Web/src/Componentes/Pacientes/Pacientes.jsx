import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Pesquisa from "./Pesquisa";
import ListaPacientes from "./ListaPacientes";
import Botao from "../Compartilhados/Botao";
import Produtos from "./Produtos";

function Pacientes() {
  const navigate = useNavigate();
  const [fichaId, setFichaId] = useState(null);
  const [pesquisa, setPesquisa] = useState("");
  const [produtos, setProdutos] = useState([]);

  const handleBuscar = async () => {
    sessionStorage.setItem("ficha_id", fichaId);
    navigate("/ficha");
  };

  return (
    <div className="h-screen w-screen bg-slate-400 flex justify-center items-center flex-row">
      <div className="relative bottom-[14em] left-16 flex flex-col justify-center space-y-4">
        <Link to={"/"}>
          <Botao conteudo={"Voltar"} />
        </Link>
      </div>

      <div className=" h-[50em] w-[70em] flex flex-col items-center p-2 space-y-4">
        <Pesquisa setPesquisa={setPesquisa} pesquisa={pesquisa} />
        <Produtos produtos={produtos} setProdutos={setProdutos} />
        <ListaPacientes
          setNFicha={setFichaId}
          pesquisa={pesquisa}
          produtos={produtos}
        />
      </div>

      <div className="relative bottom-[14em] flex flex-col justify-center space-y-4 right-16">
        <Botao conteudo={"Ver ou \nAtualizar ficha"} onClick={handleBuscar} />
      </div>
    </div>
  );
}

export default Pacientes;
