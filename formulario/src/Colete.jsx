import Observacoes from "./Observacoes";
import Option from "./Option";
import { vFormStyle } from "./utils";

function Colete() {
  return (
    <div>
      <div className={`${vFormStyle} text-center`}>
        <h1 className="text-2xl border-b-[1.5px] border-black p-1">COLETE</h1>
        <h2 className="text-xl p-2">Tipo</h2>
        <div className="border-[1.5px] border-black mx-2 h-[31em] rounded-md select-none text-start">
          <Option content={"Lombo-sacro"} />
          <Option content={"Lombar"} />
          <Option content={"Toraco-lombar"} />
          <Option content={"Toraco-cervical"} />
          <Option content={"Cervical"} />
          <Option content={"Colete 3D (Corretivo)"} />
          <div className="ml-1 h-10">
            <Observacoes id={"obs-colete"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Colete;
