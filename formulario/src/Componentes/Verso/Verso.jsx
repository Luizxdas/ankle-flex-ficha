import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import useVersoForm from "./Hooks/useVersoForm";
import CampoForm from "../Compartilhados/CampoForm";
import VersoBaseForm from "./VersoBaseForm";
import Botao from "../Compartilhados/Botao";
import { inputStyle } from "../../utils";

function Verso() {
  const pacienteRef = useRef(null);
  const formRef = useRef(null);
  const location = useLocation();
  const { db, pagina } = useVersoForm(pacienteRef, location.pathname);

  return (
    <div className="h-screen w-screen bg-slate-400 flex justify-center items-center flex-row">
      {/*  BOTÕES */}
      <div className="relative bottom-[13em] mr-3 flex flex-col justify-center space-y-4 print:hidden">
        <div>
          <Link to={"/pacientes"}>
            <Botao conteudo={"Buscar Pacientes"} />
          </Link>
        </div>
        <div>
          <Link to={"/"}>
            <Botao conteudo={"Ir para a frente"} />
          </Link>
        </div>
        <div>
          <Botao conteudo={"Imprimir"} onClick={pagina.imprimir} />
        </div>
        <div>
          <Botao
            conteudo={"Salvar"}
            onClick={() => db.salvarPaciente(pacienteRef, formRef)}
          />
        </div>
      </div>

      {/*  FORMULÁRIO */}
      <div>
        <div className="bg-white shadow-md border border-gray-300 flex flex-row">
          <div className="w-[297mm] h-[210mm] flex justify-center items-center">
            <form action="" ref={formRef}>
              <div className="flex flex-col text-[17px]">
                <div className="flex flex-row">
                  {/* LOGO */}
                  <div>
                    <img
                      src="/Logo.png"
                      alt="Logo da Ankle Flex"
                      className="w-36 h-36 mr-12"
                    />
                  </div>
                  {/* TOPO DO FORMULÁRIO */}
                  <div className="flex flex-col justify-center mt-5 w-[45em] h-[5em] rounded-md border-[1.5px] border-black">
                    <div className="border-b-[1.5px] border-black py-2">
                      <div className="flex justify-between">
                        <CampoForm
                          id={"idade"}
                          content={"IDADE:"}
                          width={"5em"}
                        />
                        <CampoForm
                          id={"sexo"}
                          content={"SEXO:"}
                          width={"5em"}
                        />
                        <CampoForm
                          id={"altura"}
                          content={"ALTURA:"}
                          width={"5em"}
                        />
                        <CampoForm
                          id={"peso"}
                          content={"PESO:"}
                          width={"5em"}
                        />
                        <CampoForm
                          id={"lado"}
                          content={"LADO:"}
                          width={"5em"}
                        />
                      </div>
                    </div>
                    <div className="py-2 flex justify-between">
                      <CampoForm id={"n_pe"} content={"Nº PÉ:"} width={"3em"} />
                      <CampoForm
                        id={"causa"}
                        content={"CAUSA DA AMPUTAÇÃO:"}
                        width={"15em"}
                      />
                      <CampoForm
                        id={"tempo"}
                        content={"TEMPO:"}
                        width={"6em"}
                      />
                    </div>
                  </div>
                  <div className="w-[8em] h-[5em] mx-6 rounded-md border-[1.5px] border-black mt-5">
                    <div className="flex flex-col items-center p-1">
                      <label htmlFor="n_ficha_paciente" className="ml-2">
                        Nº:
                      </label>
                      <input
                        id="n_ficha_paciente"
                        className={`w-[6.5em] ${inputStyle}`}
                        maxLength={16}
                        ref={pacienteRef}
                      />
                    </div>
                  </div>
                </div>
                {/* BASE DO FORMULÁRIO */}
                <div className="flex flex-row w-[66em] h-[38em] justify-between p-2">
                  <VersoBaseForm />
                  <div className="relative right-52">
                    <img
                      src="/Perna.png"
                      alt="Desenho de uma perna com medidas"
                      className="w-[27em] h-[37em]"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verso;
