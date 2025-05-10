import Observacoes from "../Compartilhados/Observacoes";
import Option from "../Compartilhados/Option";
import { baseFormStyle, vFormStyle } from "../../utils";

function Colete() {
  return (
    <div>
      <div className={`${vFormStyle} text-center`}>
        <h1 className="text-2xl border-b-[1.5px] border-black p-1">COLETE</h1>
        <h2 className="text-xl p-2 border-b-[1.5px] border-black">Tipo</h2>
        <div className={baseFormStyle}>
          <Option name={"colete"} content={"Lombo-sacro"} />
          <Option name={"colete"} content={"Lombar"} />
          <Option name={"colete"} content={"Toraco-lombar"} />
          <Option name={"colete"} content={"Toraco-cervical"} />
          <Option name={"colete"} content={"Cervical"} />
          <Option name={"colete"} content={"Colete 3D (Corretivo)"} />
          <div className="w-full h-[1.5px] border-b-[1.5px] border-black" />
          <div className="ml-1 h-10">
            <Observacoes id={"obs_colete"} name={"obs_colete"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Colete;
