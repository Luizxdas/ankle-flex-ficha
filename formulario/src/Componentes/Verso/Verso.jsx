import { useRef, useState } from "react";
import useVersoForm from "./Hooks/useVersoForm";
import CampoForm from "../Compartilhados/CampoForm";
import VersoBaseForm from "./VersoBaseForm";
import Botao from "../Compartilhados/Botao";
import { inputStyle, limparFicha, salvarFicha } from "../../utils";
import { enviarDados } from "./Utils/versoUtils";

function Verso({ mudarPagina }) {
  const formRef = useRef(null);
  const operacao = sessionStorage.getItem("operacao");
  const [ficha, setFicha] = useState("");
  const { pagina } = useVersoForm(formRef, setFicha);

  const handleVoltar = () => {
    if (salvarFicha(formRef, "verso")) {
      mudarPagina();
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-400 flex justify-center items-center flex-row">
      {/*  BOTÕES */}
      <div className="relative bottom-[19em] mr-3 flex flex-col justify-center space-y-4 print:hidden">
        <div>
          <Botao conteudo={"Voltar"} onClick={handleVoltar} />
        </div>
        <div>
          <Botao
            conteudo={"Limpar ficha"}
            onClick={() => limparFicha(formRef, "verso")}
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
                          name={"idade"}
                          content={"IDADE:"}
                          width={"5em"}
                        />
                        <CampoForm
                          id={"sexo"}
                          name={"sexo"}
                          content={"SEXO:"}
                          width={"5em"}
                        />
                        <CampoForm
                          id={"altura"}
                          name={"altura"}
                          content={"ALTURA:"}
                          width={"5em"}
                        />
                        <CampoForm
                          id={"peso"}
                          name={"peso"}
                          content={"PESO:"}
                          width={"5em"}
                        />
                        <CampoForm
                          id={"lado"}
                          name={"lado"}
                          content={"LADO:"}
                          width={"5em"}
                        />
                      </div>
                    </div>
                    <div className="py-2 flex justify-between">
                      <CampoForm
                        id={"n_pe"}
                        name={"n_pe"}
                        content={"Nº PÉ:"}
                        width={"3em"}
                      />
                      <CampoForm
                        id={"causa_amputacao"}
                        name={"causa_amputacao"}
                        content={"CAUSA DA AMPUTAÇÃO:"}
                        width={"15em"}
                      />
                      <CampoForm
                        id={"tempo"}
                        name={"tempo"}
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
                        name="n_ficha_paciente"
                        className={`w-[6.5em] ${inputStyle}`}
                        maxLength={16}
                        value={ficha}
                        onChange={(e) => setFicha(e.target.value)}
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

      <div className="relative bottom-[19em] ml-3 flex flex-col justify-center space-y-4 print:hidden">
        <div>
          <Botao conteudo={"Imprimir"} onClick={pagina.imprimir} />
        </div>
        <div>
          {operacao === "salvar" ? (
            <Botao
              conteudo={"Salvar"}
              onClick={() => enviarDados(formRef, "salvar")}
            />
          ) : (
            <Botao
              conteudo={"Atualizar"}
              onClick={() => enviarDados(formRef, "atualizar")}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Verso;
