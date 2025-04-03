import Observacoes from "../Compartilhados/Observacoes";
import Option from "../Compartilhados/Option";
import { baseFormStyle, vFormStyle } from "../../utils";

function Palmilha() {
  return (
    <div>
      <div className={`${vFormStyle} text-center`}>
        <h1 className="text-2xl border-b-[1.5px] border-black p-1">PALMILHA</h1>
        <h2 className="text-xl p-2 border-b-[1.5px] border-black">Tipo</h2>
        <div className={baseFormStyle}>
          <Option content={"Arco plantar"} />
          <Option content={"Arco e botão metatarsiano"} />
          <Option content={"Valente-valente e apoio abóboda-plantar"} />
          <Option content={"Apoio abóboda-plantar + U assimétrico"} />
          <Option content={"Apoio 1/4 esféra"} />
          <div className="w-full h-[1.5px] border-b-[1.5px] border-black" />
          <div className="ml-1 h-10">
            <Observacoes id={"obs-palmilha"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Palmilha;
