import Observacoes from "./Observacoes";
import Option from "./Option";
import { baseFormStyle, vFormStyle } from "./utils";

function Ortese() {
  return (
    <div>
      <div className={`${vFormStyle} text-center`}>
        <h1 className="text-2xl border-b-[1.5px] border-black p-1">ÓRTESE</h1>
        <h2 className="text-xl p-2 border-b-[1.5px] border-black">Tipo</h2>
        <div className={baseFormStyle}>
          <Option content={"SMO"} />
          <Option content={"AFO Fixo"} />
          <Option content={"SAFO"} />
          <Option content={"AFO Articulado"} />
          <Option content={"Brace Joelho"} />
          <Option content={"KAFO"} />
          <Option content={"HKAFO"} />
          <Option content={"Unilateral"} />
          <Option content={"Bilateral"} />
          <div className="w-full h-[1.5px] border-b-[1.5px] border-black" />
          <div className="ml-1 h-10">
            <Observacoes id={"obs-ortese"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ortese;
