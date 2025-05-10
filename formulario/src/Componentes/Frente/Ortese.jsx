import Observacoes from "../Compartilhados/Observacoes";
import Option from "../Compartilhados/Option";
import { baseFormStyle, vFormStyle } from "../../utils";

function Ortese() {
  return (
    <div>
      <div className={`${vFormStyle} text-center`}>
        <h1 className="text-2xl border-b-[1.5px] border-black p-1">ÓRTESE</h1>
        <h2 className="text-xl p-2 border-b-[1.5px] border-black">Tipo</h2>
        <div className={baseFormStyle}>
          <Option name={"ortese"} content={"SMO"} />
          <Option name={"ortese"} content={"AFO Fixo"} />
          <Option name={"ortese"} content={"SAFO"} />
          <Option name={"ortese"} content={"AFO Articulado"} />
          <Option name={"ortese"} content={"Brace Joelho"} />
          <Option name={"ortese"} content={"KAFO"} />
          <Option name={"ortese"} content={"HKAFO"} />
          <Option name={"ortese"} content={"Unilateral"} />
          <Option name={"ortese"} content={"Bilateral"} />
          <div className="w-full h-[1.5px] border-b-[1.5px] border-black" />
          <div className="ml-1 h-10">
            <Observacoes id={"obs_ortese"} name={"obs_ortese"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ortese;
