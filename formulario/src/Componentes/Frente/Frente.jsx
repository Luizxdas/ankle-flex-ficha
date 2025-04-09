import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { inputStyle } from "../../utils";
import useFrenteForm from "./Hooks/useFrenteForm";
import Colete from "./Colete";
import Ortese from "./Ortese";
import Palmilha from "./Palmilha";
import Protese from "./Protese";
import Botao from "../Compartilhados/Botao";

function Frente() {
  const pacienteRef = useRef(null);
  const formRef = useRef(null);
  const location = useLocation();
  const { db, pagina } = useFrenteForm(pacienteRef, location.pathname);

  return (
    <div className="h-screen w-screen bg-slate-400 flex justify-center items-center flex-row">
      {/*  BOTÕES */}
      <div className="relative bottom-[13em] mr-3 flex flex-col justify-center space-y-4">
        <div>
          <Link to={"/pacientes"}>
            <Botao conteudo={"Buscar Pacientes"} />
          </Link>
        </div>
        <div>
          <Link to={"/verso"}>
            <Botao conteudo={"Ir para o verso"} />
          </Link>
        </div>
        <div>
          <Botao conteudo={"Imprimir"} onClick={pagina.imprimir} />
        </div>
        <div>
          <Botao
            conteudo={"Salvar"}
            onClick={() =>
              db.salvarPaciente(pacienteRef.current.value, formRef)
            }
          />
        </div>
      </div>

      {/*  FORMULÁRIO */}
      <div>
        <div className="bg-white shadow-md border border-gray-300 h-[50em]">
          <div className="w-[297mm] h-[210mm] flex justify-center">
            <form id="patient-form" ref={formRef} action="">
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
                      <label htmlFor="nome_paciente" className="ml-2">
                        PACIENTE:
                      </label>
                      <input
                        id="nome_paciente"
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
                        <label htmlFor="n_endereco" className="ml-4">
                          N:
                        </label>
                        <input
                          id="n_endereco"
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
                      <label htmlFor="n_ficha_paciente" className="ml-2">
                        Nº:
                      </label>
                      <input
                        id="n_ficha_paciente"
                        className={`w-[9.5em] ${inputStyle}`}
                        maxLength={16}
                        ref={pacienteRef}
                      />
                    </div>
                    <div className="border-b-[1.5px] border-black py-2">
                      <label htmlFor="data_ficha" className="ml-2">
                        DATA:
                      </label>
                      <input
                        id="data_ficha"
                        className={`w-[9.5em] ${inputStyle}`}
                        maxLength={10}
                      />
                    </div>
                    <div className="border-black py-2">
                      <label htmlFor="numero_telefone" className="ml-2">
                        FONE:
                      </label>
                      <input
                        id="numero_telefone"
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
