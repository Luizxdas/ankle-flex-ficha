import CarregandoModal from "./CarregandoModal";
import ErroModal from "./ErroModal";
import ConfirmarModal from "./ConfirmarModal";
import SucessoModal from "./SucessoModal";

function Modal({ tipo, mensagem, onConfirm, onClose, isLoading }) {
  return (
    <div className="flex justify-center items-center rounded-md w-[27rem] h-[15rem] bg-slate-200">
      {isLoading ? (
        <CarregandoModal />
      ) : tipo === "erro" ? (
        <ErroModal erro={mensagem} onClose={onClose} />
      ) : tipo === "confirmar" ? (
        <ConfirmarModal
          mensagem={mensagem}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      ) : (
        <SucessoModal mensagem={mensagem} onClose={onClose} />
      )}
    </div>
  );
}

export default Modal;
