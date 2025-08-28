import Observacoes from "../Compartilhados/Observacoes";
import Option from "../Compartilhados/Option";
import { baseFormStyle, vFormStyle } from "../../utils/utils";

const coletes = [
  { id: "lombo_sacro", label: "Lombo-sacro" },
  { id: "lombar", label: "Lombar" },
  { id: "toraco_lombar", label: "Tóraco-lombar" },
  { id: "toraco_cervical", label: "Tóraco-cervical" },
  { id: "cervical", label: "Cervical" },
  { id: "colete_3d_corretivo", label: "Colete 3D Corretivo" },
];

function Colete({ formData, handleChange }) {
  return (
    <div>
      <div className={`${vFormStyle} text-center`}>
        <h1 className="text-2xl border-b-[1.5px] border-black p-1">COLETE</h1>
        <h2 className="text-xl p-2 border-b-[1.5px] border-black">Tipo</h2>
        <div className={baseFormStyle}>
          {coletes.map((colete) => (
            <Option
              key={colete.id}
              name={colete.id}
              value={colete.label}
              checked={formData[colete.id]?.valor || false}
              handleChange={handleChange}
            />
          ))}
          <div className="w-full h-[1.5px] border-b-[1.5px] border-black" />
          <div className="px-1 h-64 flex items-center text-center justify-center">
            <Observacoes
              id={"observacoes_colete"}
              name={"colete"}
              handleChange={handleChange}
              value={formData.colete?.valor || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Colete;
