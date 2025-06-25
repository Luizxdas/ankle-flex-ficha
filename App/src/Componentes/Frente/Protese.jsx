import Observacoes from "../Compartilhados/Observacoes";
import Option from "../Compartilhados/Option";
import { baseFormStyle, vFormStyle } from "../../utils";

function Protese() {
  const proteseOptions = [
    "Dedos",
    "Metatarsiana",
    "Lisfranc",
    "Chopart",
    "Syme",
    "Transtibial",
    "Desarticulação do Joelho",
    "Transfemural",
    "Desarticulação do Quadril",
    "Hemipelvectomia",
  ];

  return (
    <div>
      <div className={`${vFormStyle} text-center`}>
        <h1 className="text-2xl border-b-[1.5px] border-black p-1">PRÓTESE</h1>
        <h2 className="text-xl p-2 border-b-[1.5px] border-black">
          Nivel de Amputação
        </h2>
        <div className={baseFormStyle}>
          {proteseOptions.map((option) => (
            <Option key={option} name="produtos_protese" content={option} />
          ))}
          <div className="w-full h-[1.5px] border-b-[1.5px] border-black" />
          <div className="ml-1 h-10">
            <Observacoes
              id={"observacoes_protese"}
              name={"observacoes_protese"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Protese;
