import { Link } from "react-router-dom";
import CampoForm from "../Compartilhados/CampoForm";
import VersoBaseForm from "./VersoBaseForm";

function Verso() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-screen w-screen bg-slate-400 flex justify-center flex-row">
      {/*  BOTÕES */}
      <div className="print:hidden flex flex-col justify-center mt-24 space-y-4">
        <Link to={"/"}>
          <button className="relative flex justify-center items-center p-4 text-center right-[1em] bottom-[22em] rounded-md bg-slate-500 shadow-xl w-35 h-20 text-white">
            Ir para a frente
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

        <div className="bg-white shadow-md border border-gray-300 flex flex-row">
          <div className="w-[297mm] h-[210mm] flex justify-center items-center">
            <form action="">
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
                  <div className="flex flex-col justify-center mt-5 w-[50em] h-[5em] rounded-md border-[1.5px] border-black">
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
                      <CampoForm id={"npe"} content={"Nº PÉ:"} width={"5em"} />
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
