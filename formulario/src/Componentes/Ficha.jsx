import Frente from "./Frente/Frente";
import Verso from "./Verso/Verso";
import { useNavigate } from "react-router-dom";

function Ficha() {
  const searchParams = new URLSearchParams(location.search);
  const lado = searchParams.get("lado");
  const navigate = useNavigate();

  const mudarPagina = () => {
    const novoLado = lado === "frente" ? "verso" : "frente";
    navigate(`/ficha?lado=${novoLado}`);
  };

  return (
    <div className="h-screen w-screen bg-slate-400 flex items-center justify-center">
      {lado === "frente" ? (
        <Frente mudarPagina={mudarPagina} />
      ) : (
        <Verso mudarPagina={mudarPagina} />
      )}
    </div>
  );
}

export default Ficha;
