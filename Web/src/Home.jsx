import { useNavigate } from "react-router-dom";
import Botao from "./componentes/Compartilhados/Botao";
import LogoHd from "/blank-logo-hd.png";

function Home() {
  const navigate = useNavigate();

  const handleCriar = () => {
    sessionStorage.setItem("operacao", "salvar");
    sessionStorage.removeItem("n_ficha");
    navigate("/ficha");
  };

  const handleBuscar = () => {
    sessionStorage.setItem("operacao", "atualizar");
    sessionStorage.removeItem("n_ficha");
    navigate("/pacientes");
  };

  return (
    <div className="h-screen w-screen bg-slate-400 flex items-center justify-center">
      <div className="bg-slate-300 p-4 rounded-lg flex flex-col justify-center items-center space-y-4 mb-24">
        <div>
          <img
            src={LogoHd}
            alt="Logo da Ankle Flex"
            className="w-[185px] h-[140px]"
          />
        </div>
        <Botao conteudo={"Buscar ficha"} onClick={handleBuscar} />

        <Botao conteudo={"Criar ficha"} onClick={handleCriar} />
      </div>
    </div>
  );
}

export default Home;
