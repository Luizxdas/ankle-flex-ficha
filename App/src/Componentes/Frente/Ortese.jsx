import Observacoes from "../Compartilhados/Observacoes";
import Option from "../Compartilhados/Option";
import { baseFormStyle, vFormStyle } from "../../utils";

function Ortese() {
  const orteseOptions = [
    "SMO",
    "AFO Fixo",
    "SAFO",
    "AFO Articulado",
    "Brace Joelho",
    "KAFO",
    "HKAFO",
    "Unilateral",
    "Bilateral",
  ];

  return (
    <div>
      <div className={`${vFormStyle} text-center`}>
        <h1 className="text-2xl border-b-[1.5px] border-black p-1">ÓRTESE</h1>
        <h2 className="text-xl p-2 border-b-[1.5px] border-black">Tipo</h2>
        <div className={baseFormStyle}>
          {orteseOptions.map((option) => (
            <Option key={option} name="produtos_ortese" content={option} />
          ))}
          <div className="w-full h-[1.5px] border-b-[1.5px] border-black" />
          <div className="ml-1 h-10">
            <Observacoes
              id={"observacoes_ortese"}
              name={"observacoes_ortese"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ortese;
