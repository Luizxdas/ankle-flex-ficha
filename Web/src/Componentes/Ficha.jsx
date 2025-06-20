import { useRef, useState } from "react";
import Frente from "./Frente/Frente";
import Verso from "./Verso/Verso";
import Botao from "./Compartilhados/Botao";
import useFichav2 from "../hooks/useFichav2";
import Modal from "./Compartilhados/Modal";
import { limparFicha } from "../utils";

function Ficha() {
  const operacao = sessionStorage.getItem("operacao");
  const formRef = useRef();
  const [modal, setModal] = useState("");
  const [nFicha, setNFicha] = useState("");
  const { pagina } = useFichav2(formRef, setModal, setNFicha);

  return (
    <div>
      {modal && (
        <div className="fixed w-screen h-screen bg-black/40 flex items-center justify-center z-10">
          <Modal
            tipo={modal}
            onConfirm={pagina.onModalConfirm}
            onClose={pagina.onModalClose}
            isLoading={pagina.isLoading}
            erro={pagina.error}
          />
        </div>
      )}
      <div className=" bg-slate-400 flex flex-row items-center justify-center z-0">
        <div className="print:hidden relative right-44">
          <div className="fixed top-10">
            <div className="flex flex-col space-y-4">
              <Botao conteudo={"Voltar"} onClick={pagina.handleVoltar} />
              <Botao
                conteudo={"Limpar Ficha"}
                onClick={() => limparFicha(formRef)}
              />
            </div>
          </div>
        </div>

        <form action="" ref={formRef}>
          <div className="flex flex-col">
            <div className="print:hidden mt-8"></div>
            <div className="w-[297mm] h-[200mm]">
              <Frente nFicha={nFicha} setNFicha={setNFicha} />
            </div>
            <div className="print:hidden my-12"></div>
            <div className="page-break w-[297mm] h-[200mm]">
              <Verso nFicha={nFicha} setNFicha={setNFicha} />
            </div>
            <div className="print:hidden mb-12"></div>
          </div>
        </form>

        <div className="print:hidden relative">
          <div className="ml-8 fixed top-10">
            <div className="flex flex-col space-y-4">
              <Botao
                conteudo={operacao === "atualizar" ? "Atualizar" : "Salvar"}
                onClick={() => pagina.handleSalvar(formRef)}
              />
              <Botao conteudo={"Imprimir"} onClick={() => window.print()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ficha;
