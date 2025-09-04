import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { formatarCampo, limparFicha } from "../utils/utils";
import Frente from "./Frente/Frente";
import Verso from "./Verso/Verso";
import Botao from "./Compartilhados/Botao";
import useFichav2 from "../hooks/useFichav2";
import Modal from "./Compartilhados/modal/Modal";
import dadosForm from "../utils/dadosForm";

function Ficha() {
  const location = useLocation();
  const formRef = useRef();
  const [modal, setModal] = useState("");
  const [mensagemModal, setMensagemModal] = useState("");
  const [formData, setFormData] = useState(() =>
    JSON.parse(JSON.stringify(dadosForm))
  );
  const { operacao } = location.state || {};
  const { pagina } = useFichav2(
    setModal,
    setMensagemModal,
    formData,
    setFormData
  );

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    const formattedValue =
      type === "checkbox" ? checked : formatarCampo(name, value.toUpperCase());

    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        valor: formattedValue,
      },
    }));
  };

  const handleLimpar = () => {
    setFormData(JSON.parse(JSON.stringify(dadosForm)));
    limparFicha(formRef);
  };

  return (
    <div className="bg-slate-400">
      {modal && (
        <div className="fixed w-screen h-screen bg-black/40 flex items-center justify-center z-10">
          <Modal
            tipo={modal}
            mensagem={mensagemModal}
            onConfirm={pagina.onModalConfirm}
            onClose={pagina.onModalClose}
            isLoading={pagina.isLoading}
          />
        </div>
      )}
      {pagina.isLoading && (
        <div className="fixed w-screen h-screen bg-black/40 flex items-center justify-center z-10">
          <div className="w-full h-full flex justify-center items-center ">
            <div className="flex items-center justify-center space-x-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center z-0">
        <div className="print:hidden flex mt-8 mr-4">
          <div>
            <div className="flex flex-col space-y-4">
              <Botao conteudo={"Voltar"} onClick={pagina.handleVoltar} />
              <Botao conteudo={"Limpar Ficha"} onClick={handleLimpar} />
            </div>
          </div>
        </div>

        <form action="" ref={formRef}>
          <div className="flex flex-col">
            <div className="print:hidden mt-8"></div>
            <div className="w-[297mm] h-[200mm]">
              <Frente
                formData={formData}
                handleChange={handleChange}
                operacao={operacao}
              />
            </div>
            <div className="print:hidden my-12"></div>
            <div className="page-break w-[297mm] h-[200mm]">
              <Verso
                formData={formData}
                handleChange={handleChange}
                operacao={operacao}
              />
            </div>
            <div className="print:hidden mb-12"></div>
          </div>
        </form>

        <div className="print:hidden flex mt-8 ml-4">
          <div>
            <div className="flex flex-col space-y-4">
              <Botao
                conteudo={operacao === "atualizar" ? "Atualizar" : "Salvar"}
                onClick={() => pagina.handleSalvar()}
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
