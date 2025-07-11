import CampoForm from "../Compartilhados/CampoForm";
import VersoBaseForm from "./VersoBaseForm";
import Logo from "/Logo.png";
import Perna from "/Perna.png";

function Verso({ formData, handleChange }) {
  return (
    <div className="bg-slate-400 flex justify-center items-center flex-row">
      {/*  FORMULÁRIO */}
      <div>
        <div className="bg-white shadow-md border border-gray-300 flex flex-row">
          <div className="flex justify-center items-center">
            <div className="flex flex-col text-[17px]">
              <div className="flex flex-row">
                {/* LOGO */}
                <div>
                  <img
                    src={Logo}
                    alt="Logo da Ankle Flex"
                    className="w-36 h-36 mr-12"
                  />
                </div>
                {/* TOPO DO FORMULÁRIO */}
                <div className="flex flex-col justify-center mt-5 w-[45em] h-[5em] rounded-md border-[1.5px] border-black">
                  <div className="border-b-[1.5px] border-black py-2">
                    <div className="flex justify-between">
                      <CampoForm
                        id={"caracteristicas_idade"}
                        name={"idade"}
                        content={"IDADE:"}
                        width={"5em"}
                        value={formData.idade?.valor || ""}
                        handleChange={handleChange}
                      />
                      <CampoForm
                        id={"caracteristicas_sexo"}
                        name={"sexo"}
                        content={"SEXO:"}
                        width={"5em"}
                        value={formData.sexo?.valor || ""}
                        handleChange={handleChange}
                      />
                      <CampoForm
                        id={"caracteristicas_altura"}
                        name={"altura"}
                        content={"ALTURA:"}
                        width={"5em"}
                        value={formData.altura?.valor || ""}
                        handleChange={handleChange}
                      />
                      <CampoForm
                        id={"caracteristicas_peso"}
                        name={"peso"}
                        content={"PESO:"}
                        width={"5em"}
                        value={formData.peso?.valor || ""}
                        handleChange={handleChange}
                      />
                      <CampoForm
                        id={"informacoes_lado"}
                        name={"lado"}
                        content={"LADO:"}
                        width={"3em"}
                        value={formData.lado?.valor || ""}
                        handleChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="py-2 flex justify-between">
                    <CampoForm
                      id={"informacoes_n_pe"}
                      name={"n_pe"}
                      content={"Nº PÉ:"}
                      width={"3em"}
                      value={formData.n_pe?.valor || ""}
                      handleChange={handleChange}
                    />
                    <CampoForm
                      id={"informacoes_causa_amputacao"}
                      name={"causa_amputacao"}
                      content={"CAUSA DA AMPUTAÇÃO:"}
                      width={"15em"}
                      value={formData.causa_amputacao?.valor || ""}
                      handleChange={handleChange}
                    />
                    <CampoForm
                      id={"informacoes_tempo"}
                      name={"tempo"}
                      content={"TEMPO:"}
                      width={"6em"}
                      value={formData.tempo?.valor || ""}
                      handleChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-[8em] h-[5em] mx-6 rounded-md border-[1.5px] border-black mt-5">
                  <div className="flex flex-col items-center text-center p-1">
                    <CampoForm
                      id="identidade_ficha_id_verso"
                      name="ficha_id"
                      content="Nº FICHA:"
                      width="6.5em"
                      centro={true}
                      maxLength={16}
                      value={formData.ficha_id?.valor || ""}
                      handleChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              {/* BASE DO FORMULÁRIO */}
              <div className="flex flex-row">
                <div className="flex flex-row w-[66em] h-[37.5em] justify-between pl-2 mt-2">
                  <VersoBaseForm
                    formData={formData}
                    handleChange={handleChange}
                  />
                  <div>
                    <img
                      src={Perna}
                      alt="Desenho de uma perna com medidas"
                      className="w-[27em] h-[37em]"
                    />
                  </div>
                  <div className="flex flex-col gap-y-3">
                    <div className="flex flex-col items-center text-center w-[8em] h-[5em] mr-5 rounded-md border-[1.5px] border-black p-1">
                      <CampoForm
                        id={"informacoes_preco"}
                        name={"preco"}
                        content={"ORÇAMENTO:"}
                        width={"7em"}
                        centro={true}
                        value={formData.preco?.valor || ""}
                        handleChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col items-center text-center w-[8em] h-[5em] mr-5 rounded-md border-[1.5px] border-black p-1">
                      <CampoForm
                        id={"informacoes_data_entrega"}
                        name={"data_entrega"}
                        content={"ENTREGA:"}
                        width={"6em"}
                        centro={true}
                        value={formData.data_entrega?.valor || ""}
                        handleChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verso;
