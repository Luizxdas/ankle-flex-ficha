import Observacoes from "./Observacoes";
import Option from "./Option";
import { vFormStyle } from "./utils";

function Palmilha() {
  return (
    <div>
      <div className={`${vFormStyle} text-center`}>
        <h1 className="text-2xl border-b-[1.5px] border-black p-1">PALMILHA</h1>
        <h2 className="text-xl p-2">Tipo</h2>
        <div className="border-[1.5px] border-black mx-2 h-[31em] rounded-md select-none text-start">
          <Option content={"Arco plantar"} />
          <Option content={"Arco e botão metatarsiano"} />
          <Option content={"Valente-valente e apoio abóboda-plantar"} />
          <Option content={"Apoio abóboda-plantar + U assimétrico"} />
          <Option content={"Apoio 1/4 esféra"} />
          <div className="ml-1 h-10">
            <Observacoes id={"obs-palmilha"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Palmilha;
