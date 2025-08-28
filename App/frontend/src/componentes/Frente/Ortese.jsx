import Observacoes from "../Compartilhados/Observacoes";
import Option from "../Compartilhados/Option";
import { baseFormStyle, vFormStyle } from "../../utils/utils";

function Ortese({ formData, handleChange }) {
  const orteses = [
    { id: "smo", label: "SMO" },
    { id: "afo_fixo", label: "AFO Fixo" },
    { id: "safo", label: "SAFO" },
    { id: "afo_articulado", label: "AFO Articulado" },
    { id: "brace_joelho", label: "Brace Joelho" },
    { id: "kafo", label: "KAFO" },
    { id: "hkafo", label: "HKAFO" },
    { id: "unilateral", label: "Unilateral" },
    { id: "bilateral", label: "Bilateral" },
  ];

  return (
    <div>
      <div className={`${vFormStyle} text-center`}>
        <h1 className="text-2xl border-b-[1.5px] border-black p-1">ÓRTESE</h1>
        <h2 className="text-xl p-2 border-b-[1.5px] border-black">Tipo</h2>
        <div className={baseFormStyle}>
          {orteses.map((ortese) => (
            <Option
              key={ortese.id}
              name={ortese.id}
              value={ortese.label}
              checked={formData[ortese.id]?.valor || false}
              handleChange={handleChange}
            />
          ))}
          <div className="w-full h-[1.5px] border-b-[1.5px] border-black" />
          <div className="px-1 h-36 flex items-center text-center justify-center">
            <Observacoes
              id={"observacoes_ortese"}
              name={"ortese"}
              handleChange={handleChange}
              value={formData.ortese?.valor || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ortese;
