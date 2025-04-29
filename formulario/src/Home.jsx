import { Link, useNavigate } from "react-router-dom";
import Botao from "./componentes/Compartilhados/Botao";

function Home() {
  const navigate = useNavigate();

  const handleCriar = () => {
    sessionStorage.setItem("operacao", "salvar");
    navigate("/ficha");
  };

  return (
    <div className="h-screen w-screen bg-slate-400 flex items-center justify-center">
      <div className="bg-slate-300 p-4 rounded-lg flex flex-col justify-center items-center space-y-4 mb-24">
        <div>
          <img
            src="/blank-logo-hd.png"
            alt="Logo da Ankle Flex"
            className="w-[185px] h-[140px]"
          />
        </div>
        <Link to={"/pacientes"}>
          <Botao conteudo={"Buscar ficha"} />
        </Link>

        <Botao conteudo={"Criar ficha"} onClick={handleCriar} />
      </div>
    </div>
  );
}

export default Home;
