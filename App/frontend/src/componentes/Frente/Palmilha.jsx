import Observacoes from "../Compartilhados/Observacoes";
import Option from "../Compartilhados/Option";
import { baseFormStyle, vFormStyle } from "../../utils/utils";

function Palmilha({ formData, handleChange }) {
  const palmilhas = [
    { id: "arco_plantar", label: "Arco plantar" },
    { id: "arco_e_botao_metatarsiano", label: "Arco e botão metatarsiano" },
    {
      id: "valente_valente_apoio_aboboda_plantar",
      label: "Valente-valente e apoio abóboda-plantar",
    },
    {
      id: "apoio_aboboda_plantar_u_assimetrico",
      label: "Apoio abóboda-plantar + U assimétrico",
    },
    { id: "apoio_1_4_esfera", label: "Apoio 1/4 esféra" },
  ];

  return (
    <div>
      <div className={`${vFormStyle} text-center`}>
        <h1 className="text-2xl border-b-[1.5px] border-black p-1">PALMILHA</h1>
        <h2 className="text-xl p-2 border-b-[1.5px] border-black">Tipo</h2>
        <div className={baseFormStyle}>
          {palmilhas.map((palmilha) => (
            <Option
              key={palmilha.id}
              name={palmilha.id}
              value={palmilha.label}
              checked={formData[palmilha.id]?.valor || false}
              handleChange={handleChange}
            />
          ))}
          <div className="w-full h-[1.5px] border-b-[1.5px] border-black" />
          <div className="ml-1 h-10">
            <Observacoes
              id={"observacoes_palmilha"}
              name={"palmilha"}
              handleChange={handleChange}
              value={formData.palmilha?.valor || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Palmilha;
