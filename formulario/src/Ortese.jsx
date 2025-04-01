import Observacoes from "./Observacoes";
import Option from "./Option";
import { vFormStyle } from "./utils";

function Ortese() {
  return (
    <div>
      <div className={`${vFormStyle} text-center`}>
        <h1 className="text-2xl border-b-[1.5px] border-black p-1">ÓRTESE</h1>
        <h2 className="text-xl p-2">Tipo</h2>
        <div className="border-[1.5px] border-black mx-2 h-[31em] rounded-md select-none text-start">
          <Option content={"SMO"} />
          <Option content={"AFO Fixo"} />
          <Option content={"SAFO"} />
          <Option content={"AFO Articulado"} />
          <Option content={"Brace Joelho"} />
          <Option content={"KAFO"} />
          <Option content={"HKAFO"} />
          <Option content={"Unilateral"} />
          <Option content={"Bilateral"} />
          <div className="ml-1 h-10">
            <Observacoes id={"obs-ortese"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ortese;
