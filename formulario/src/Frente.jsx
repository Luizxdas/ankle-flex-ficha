import { Link } from "react-router-dom";
import Colete from "./Colete";
import Ortese from "./Ortese";
import Palmilha from "./Palmilha";
import Protese from "./Protese";
import { inputStyle } from "./utils";

function Frente() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-screen w-screen bg-slate-400 flex justify-center flex-row">
      {/*  BOTÕES */}
      <div className="print:hidden flex flex-col justify-center mt-24 space-y-4">
        <Link to={"/verso"}>
          <button className="relative flex justify-center items-center p-4 text-center right-[1em] bottom-[22em] rounded-md bg-slate-500 shadow-xl w-35 h-20 text-white">
            Ir para o verso
          </button>
        </Link>
        <button
          onClick={handlePrint}
          className="relative flex justify-center items-center p-4 text-center right-[1em] bottom-[22em] rounded-md bg-slate-500 shadow-xl w-35 h-20 text-white"
        >
          Imprimir
        </button>
      </div>

      {/*  FORMULÁRIO */}
      <div>
        <div className="print:hidden mt-16"></div>
        <div className="bg-white shadow-md border border-gray-300 h-[50em]">
          <div className="w-[297mm] h-[210mm] flex justify-center">
            <form action="">
              <div className="flex flex-col text-[17px]">
                {/* LOGO DO FORMULÁRIO */}
                <div className="flex flex-row">
                  <div>
                    <img
                      src="/Logo.png"
                      alt="Logo da Ankle Flex"
                      className="w-36 h-36 mr-2"
                    />
                  </div>
                  {/* TOPO DO FORMULÁRIO */}
                  <div className="flex flex-col justify-center mt-5 mr-5 w-[40em] h-[7em] rounded-md border-[1.5px] border-black">
                    <div className="border-b-[1.5px] border-black py-2">
                      <label htmlFor="paciente" className="ml-2">
                        PACIENTE:
                      </label>
                      <input
                        id="paciente"
                        className={`w-[34em] ${inputStyle}`}
                        maxLength={78}
                      />
                    </div>
                    <div className="border-b-[1.5px] border-black py-2">
                      <div>
                        <label htmlFor="endereco" className="ml-2">
                          ENDEREÇO:
                        </label>
                        <input
                          id="endereco"
                          className={`w-[20em] ${inputStyle}`}
                          maxLength={35}
                        />
                        <label htmlFor="numero" className="ml-4">
                          N:
                        </label>
                        <input
                          id="numero"
                          className={`w-[3.5em] ${inputStyle}`}
                          maxLength={6}
                        />
                        <label htmlFor="cep" className="ml-3">
                          CEP:
                        </label>
                        <input
                          id="cep"
                          className={`w-[5em] ${inputStyle}`}
                          maxLength={9}
                        />
                      </div>
                    </div>
                    <div className="py-2">
                      <label htmlFor="bairro" className="ml-2">
                        BAIRRO:
                      </label>
                      <input
                        id="bairro"
                        className={`w-[16em] ${inputStyle}`}
                        maxLength={41}
                      />
                      <label htmlFor="cidade" className="ml-4">
                        CIDADE:
                      </label>
                      <input
                        id="cidade"
                        className={`w-[8em] ${inputStyle}`}
                        maxLength={13}
                      />
                      <label htmlFor="estado" className="ml-3">
                        ESTADO:
                      </label>
                      <input
                        id="estado"
                        className={`w-[1.5em] ${inputStyle}`}
                        maxLength={2}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col mr-5 w-[15em] h-[7em] rounded-md border-[1.5px] border-black justify-center mt-5">
                    <div className="border-b-[1.5px] border-black py-2">
                      <label htmlFor="nPaciente" className="ml-2">
                        Nº:
                      </label>
                      <input
                        id="nPaciente"
                        className={`w-[9.5em] ${inputStyle}`}
                        maxLength={16}
                      />
                    </div>
                    <div className="border-b-[1.5px] border-black py-2">
                      <label htmlFor="data" className="ml-2">
                        DATA:
                      </label>
                      <input
                        id="data"
                        className={`w-[9.5em] ${inputStyle}`}
                        maxLength={10}
                      />
                    </div>
                    <div className="border-black py-2">
                      <label htmlFor="telefone" className="ml-2">
                        FONE:
                      </label>
                      <input
                        id="telefone"
                        className={`w-[9.5em] ${inputStyle}`}
                        maxLength={16}
                      />
                    </div>
                  </div>
                </div>
                {/* BASE DO FORMULÁRIO */}
                <div className="flex flex-row w-[66em] h-[38em]  justify-between p-2">
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
