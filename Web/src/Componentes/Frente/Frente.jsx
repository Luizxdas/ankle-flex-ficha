import { formatarData, inputStyle } from "../../utils";
import CampoForm from "../Compartilhados/CampoForm";
import Colete from "./Colete";
import Ortese from "./Ortese";
import Palmilha from "./Palmilha";
import Protese from "./Protese";
import Logo from "/Logo.png";

function Frente({ frenteRef, nFicha, setNFicha }) {
  const data = new Date().toLocaleDateString();

  return (
    <div className="bg-slate-400 flex justify-center items-center flex-row">
      {/* FORMULÁRIO */}
      <div>
        <div className="bg-white shadow-md h-[50em]">
          <div className="flex justify-center">
            <form ref={frenteRef}>
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
                        id="nome_paciente"
                        name="nome_paciente"
                        content="PACIENTE:"
                        width="34em"
                      />
                    </div>

                    <div className="border-b-[1.5px] border-black py-2">
                      <div className="flex justify-between">
                        <CampoForm
                          id="endereco"
                          name="endereco"
                          content="ENDEREÇO:"
                          width="20em"
                        />
                        <CampoForm
                          id="n_endereco"
                          name="n_endereco"
                          content="N:"
                          width="3.5em"
                          maxLength={6}
                        />
                        <CampoForm
                          id="cep"
                          name="cep"
                          content="CEP:"
                          width="5em"
                          maxLength={9}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between py-2">
                      <CampoForm
                        id="bairro"
                        name="bairro"
                        content="BAIRRO:"
                        width="16em"
                        maxLength={41}
                      />
                      <CampoForm
                        id="cidade"
                        name="cidade"
                        content="CIDADE:"
                        width="8em"
                        maxLength={13}
                      />
                      <CampoForm
                        id="estado"
                        name="estado"
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
                        id="n_ficha"
                        name="n_ficha"
                        className={`w-[6.5em] ${inputStyle}`}
                        maxLength={16}
                        value={nFicha}
                        onChange={(e) => setNFicha(e.target.value)}
                      />
                    </div>
                    <div className="border-b-[1.5px] border-black py-2 pl-2">
                      <CampoForm
                        id="data_ficha"
                        name="data_ficha"
                        content="DATA:"
                        width="9.5em"
                        maxLength={10}
                        onChange={formatarData}
                        defaultValue={data}
                      />
                    </div>
                    <div className="py-2 pl-2">
                      <CampoForm
                        id="telefone"
                        name="telefone"
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Frente;
