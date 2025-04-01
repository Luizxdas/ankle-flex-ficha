import Observacoes from "./Observacoes";
import Option from "./Option";
import { baseFormStyle, vFormStyle } from "./utils";

function Protese() {
  return (
    <div>
      <div className={`${vFormStyle} text-center`}>
        <h1 className="text-2xl border-b-[1.5px] border-black p-1">PRÓTESE</h1>
        <h2 className="text-xl p-2 border-b-[1.5px] border-black">
          Nivel de Amputação
        </h2>
        <div className={baseFormStyle}>
          <Option content={"Dedos"} />
          <Option content={"Metatarsiana"} />
          <Option content={"Lisfranc"} />
          <Option content={"Chopart"} />
          <Option content={"Syme"} />
          <Option content={"Transtibial"} />
          <Option content={"Desarticulação do Joelho"} />
          <Option content={"Transfemural"} />
          <Option content={"Desarticulação do Quadril"} />
          <Option content={"Hemipelvectomia"} />
          <div className="w-full h-[1.5px] border-b-[1.5px] border-black" />
          <div className="ml-1 h-10">
            <Observacoes id={"obs-protese"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Protese;
