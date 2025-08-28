import Observacoes from "../Compartilhados/Observacoes";
import Option from "../Compartilhados/Option";
import { baseFormStyle, vFormStyle } from "../../utils/utils";

function Protese({ formData, handleChange }) {
  const proteses = [
    { id: "dedos", label: "Dedos" },
    { id: "metatarsiana", label: "Metatarsiana" },
    { id: "lisfranc", label: "Lisfranc" },
    { id: "chopart", label: "Chopart" },
    { id: "syme", label: "Syme" },
    { id: "transtibial", label: "Transtibial" },
    { id: "desarticulacao_joelho", label: "Desarticulação de Joelho" },
    { id: "transfemural", label: "Transfemural" },
    { id: "desarticulacao_quadril", label: "Desarticulação de Quadril" },
    { id: "hemipelvectomia", label: "Hemipelvectomia" },
  ];

  return (
    <div>
      <div className={`${vFormStyle} text-center`}>
        <h1 className="text-2xl border-b-[1.5px] border-black p-1">PRÓTESE</h1>
        <h2 className="text-xl p-2 border-b-[1.5px] border-black">
          Nivel de Amputação
        </h2>
        <div className={baseFormStyle}>
          {proteses.map((protese) => (
            <Option
              key={protese.id}
              name={protese.id}
              value={protese.label}
              checked={formData[protese.id]?.valor || false}
              handleChange={handleChange}
            />
          ))}
          <div className="w-full h-[1.5px] border-b-[1.5px] border-black" />
          <div className="h-28 px-1 flex items-center text-center justify-center">
            <Observacoes
              id={"observacoes_protese"}
              name={"protese"}
              handleChange={handleChange}
              value={formData.protese?.valor || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Protese;
