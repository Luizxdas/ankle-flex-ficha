import { formatarData, inputStyle } from "../../utils";
import CampoForm from "../Compartilhados/CampoForm";
import Colete from "./Colete";
import Ortese from "./Ortese";
import Palmilha from "./Palmilha";
import Protese from "./Protese";
import Logo from "/Logo.png";

function Frente({ nFicha, setNFicha }) {
  const data = new Date().toLocaleDateString();

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
                      name="identidade_nome_paciente"
                      content="PACIENTE:"
                      width="34em"
                    />
                  </div>

                  <div className="border-b-[1.5px] border-black py-2">
                    <div className="flex justify-between">
                      <CampoForm
                        id="localizacao_endereco"
                        name="localizacao_endereco"
                        content="ENDEREÇO:"
                        width="20em"
                      />
                      <CampoForm
                        id="localizacao_n_endereco"
                        name="localizacao_n_endereco"
                        content="N:"
                        width="3.5em"
                        maxLength={6}
                      />
                      <CampoForm
                        id="localizacao_cep"
                        name="localizacao_cep"
                        content="CEP:"
                        width="5em"
                        maxLength={9}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between py-2">
                    <CampoForm
                      id="localizacao_bairro"
                      name="localizacao_bairro"
                      content="BAIRRO:"
                      width="16em"
                      maxLength={41}
                    />
                    <CampoForm
                      id="localizacao_cidade"
                      name="localizacao_cidade"
                      content="CIDADE:"
                      width="8em"
                      maxLength={13}
                    />
                    <CampoForm
                      id="localizacao_estado"
                      name="localizacao_estado"
                      content="ESTADO:"
                      width="1.5em"
                      maxLength={2}
                    />
                  </div>
                </div>
                <div className="flex flex-col mr-5 w-[15em] h-[7em] rounded-md border-[1.5px] border-black justify-center mt-5">
                  <div className="border-b-[1.5px] border-black py-2 pl-2">
                    <label htmlFor="n_ficha" className="ml-2">
                      Nº FICHA:
                    </label>
                    <input
                      id="identidade_n_ficha_frente"
                      name="identidade_n_ficha_frente"
                      className={`w-[6.5em] ${inputStyle}`}
                      maxLength={16}
                      value={nFicha}
                      onChange={(e) => setNFicha(e.target.value)}
                    />
                  </div>
                  <div className="border-b-[1.5px] border-black py-2 pl-2">
                    <CampoForm
                      id="identidade_data_ficha"
                      name="identidade_data_ficha"
                      content="DATA:"
                      width="9.5em"
                      maxLength={10}
                      onChange={formatarData}
                      defaultValue={data}
                    />
                  </div>
                  <div className="py-2 pl-2">
                    <CampoForm
                      id="identidade_telefone"
                      name="identidade_telefone"
                      content="FONE:"
                      width="9.5em"
                      maxLength={16}
                    />
                  </div>
                </div>
              </div>
              {/* BASE DO FORMULÁRIO */}
              <div className="flex flex-row w-[66em] h-[38em] justify-between p-2">
                <Protese />
                <Ortese />
                <Colete />
                <Palmilha />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Frente;
