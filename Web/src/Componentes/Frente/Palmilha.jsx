import Observacoes from "../Compartilhados/Observacoes";
import Option from "../Compartilhados/Option";
import { baseFormStyle, vFormStyle } from "../../utils";

function Palmilha() {
  const palmilhaOptions = [
    "Arco plantar",
    "Arco e botão metatarsiano",
    "Valente-valente e apoio abóboda-plantar",
    "Apoio abóboda-plantar + U assimétrico",
    "Apoio 1/4 esféra",
  ];
  return (
    <div>
      <div className={`${vFormStyle} text-center`}>
        <h1 className="text-2xl border-b-[1.5px] border-black p-1">PALMILHA</h1>
        <h2 className="text-xl p-2 border-b-[1.5px] border-black">Tipo</h2>
        <div className={baseFormStyle}>
          {palmilhaOptions.map((option) => (
            <Option key={option} name="produtos_palmilha" content={option} />
          ))}
          <div className="w-full h-[1.5px] border-b-[1.5px] border-black" />
          <div className="ml-1 h-10">
            <Observacoes
              id={"observacoes_palmilha"}
              name={"observacoes_palmilha"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Palmilha;
