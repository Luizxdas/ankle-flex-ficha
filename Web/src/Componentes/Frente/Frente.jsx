import CampoForm from "../Compartilhados/CampoForm";
import Colete from "./Colete";
import Ortese from "./Ortese";
import Palmilha from "./Palmilha";
import Protese from "./Protese";
import Logo from "/Logo.png";

function Frente({ formData, handleChange }) {
  const operacao = sessionStorage.getItem("operacao");
  return (
    <div className="bg-slate-400 flex justify-center items-center flex-row">
      {/* FORMULÁRIO */}
      <div>
        <div className="bg-white shadow-md h-[50em]">
          <div className="flex justify-center">
            <div className="flex flex-col text-[17px]">
              {/* LOGO DO FORMULÁRIO */}
              <div className="flex flex-row">
                <div>
                  <img
                    src={Logo}
                    alt="Logo da Ankle Flex"
                    className="w-36 h-36 mr-2"
                  />
                </div>
                {/* TOPO DO FORMULÁRIO */}
                <div className="flex flex-col justify-center mt-5 mr-5 w-[40em] h-[7em] rounded-md border-[1.5px] border-black">
                  <div className="border-b-[1.5px] border-black py-2">
                    <CampoForm
                      id="identidade_nome_paciente"
                      name="nome_paciente"
                      content="PACIENTE:"
                      width="34em"
                      value={formData.nome_paciente?.valor || ""}
                      handleChange={handleChange}
                    />
                  </div>

                  <div className="border-b-[1.5px] border-black py-2">
                    <div className="flex justify-between">
                      <CampoForm
                        id="localizacao_endereco"
                        name="endereco"
                        content="ENDEREÇO:"
                        width="20em"
                        value={formData.endereco?.valor || ""}
                        handleChange={handleChange}
                      />
                      <CampoForm
                        id="localizacao_n_endereco"
                        name="n_endereco"
                        content="N:"
                        width="3.5em"
                        maxLength={6}
                        value={formData.n_endereco?.valor || ""}
                        handleChange={handleChange}
                      />
                      <CampoForm
                        id="localizacao_cep"
                        name="cep"
                        content="CEP:"
                        width="5em"
                        maxLength={9}
                        value={formData.cep?.valor || ""}
                        handleChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between py-2">
                    <CampoForm
                      id="localizacao_bairro"
                      name="bairro"
                      content="BAIRRO:"
                      width="16em"
                      maxLength={41}
                      value={formData.bairro?.valor || ""}
                      handleChange={handleChange}
                    />
                    <CampoForm
                      id="localizacao_cidade"
                      name="cidade"
                      content="CIDADE:"
                      width="8em"
                      maxLength={13}
                      value={formData.cidade?.valor || ""}
                      handleChange={handleChange}
                    />
                    <CampoForm
                      id="localizacao_estado"
                      name="estado"
                      content="ESTADO:"
                      width="1.5em"
                      maxLength={2}
                      value={formData.estado?.valor || ""}
                      handleChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col mr-5 w-[15em] h-[7em] rounded-md border-[1.5px] border-black justify-center mt-5">
                  <div
                    className={`border-b-[1.5px] border-black py-2 pl-2 ${
                      operacao === "atualizar" ? "opacity-50 select-none" : ""
                    }`}
                  >
                    <CampoForm
                      id="identidade_ficha_id_frente"
                      name="ficha_id"
                      content="Nº FICHA:"
                      width="6.5em"
                      maxLength={16}
                      value={formData.ficha_id?.valor || ""}
                      readOnly={operacao === "atualizar"}
                      handleChange={handleChange}
                    />
                  </div>
                  <div className="border-b-[1.5px] border-black py-2 pl-2">
                    <CampoForm
                      id="identidade_data_ficha"
                      name="data_ficha"
                      content="DATA:"
                      width="9.5em"
                      maxLength={10}
                      value={formData.data_ficha?.valor || ""}
                      handleChange={handleChange}
                    />
                  </div>
                  <div className="py-2 pl-2">
                    <CampoForm
                      id="identidade_telefone"
                      name="telefone"
                      content="FONE:"
                      width="9.5em"
                      maxLength={16}
                      value={formData.telefone?.valor || ""}
                      handleChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              {/* BASE DO FORMULÁRIO */}
              <div className="flex flex-row w-[66em] h-[38em] justify-between p-2">
                <Protese formData={formData} handleChange={handleChange} />
                <Ortese formData={formData} handleChange={handleChange} />
                <Colete formData={formData} handleChange={handleChange} />
                <Palmilha formData={formData} handleChange={handleChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Frente;
