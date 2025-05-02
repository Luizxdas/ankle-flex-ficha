import Observacoes from "../Compartilhados/Observacoes";
import Option from "../Compartilhados/Option";
import { baseFormStyle, vFormStyle } from "../../utils";

function Protese() {
  return (
    <div>
      <div className={`${vFormStyle} text-center`}>
        <h1 className="text-2xl border-b-[1.5px] border-black p-1">PRÓTESE</h1>
        <h2 className="text-xl p-2 border-b-[1.5px] border-black">
          Nivel de Amputação
        </h2>
        <div className={baseFormStyle}>
          <Option name={"protese"} content={"Dedos"} />
          <Option name={"protese"} content={"Metatarsiana"} />
          <Option name={"protese"} content={"Lisfranc"} />
          <Option name={"protese"} content={"Chopart"} />
          <Option name={"protese"} content={"Syme"} />
          <Option name={"protese"} content={"Transtibial"} />
          <Option name={"protese"} content={"Desarticulação do Joelho"} />
          <Option name={"protese"} content={"Transfemural"} />
          <Option name={"protese"} content={"Desarticulação do Quadril"} />
          <Option name={"protese"} content={"Hemipelvectomia"} />
          <div className="w-full h-[1.5px] border-b-[1.5px] border-black" />
          <div className="ml-1 h-10">
            <Observacoes id={"obs-protese"} name={"obs-protese"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Protese;
