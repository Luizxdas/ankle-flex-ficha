function ConfirmarModal({ mensagem, onConfirm, onClose }) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 p-6">
      <span className="w-10 h-10 mt-2 flex items-center justify-center rounded-full bg-yellow-400 text-white text-xl font-bold">
        !
      </span>
      <span className="text-lg mt-1">{mensagem}</span>
      <div className="flex flex-row w-[12em] space-x-4 mt-4">
        <button
          className="bg-slate-500 hover:bg-slate-600 w-[4em] h-[2.5em] rounded-md text-white text-xl"
          onClick={onClose}
        >
          Voltar
        </button>
        <button
          className="bg-slate-500 hover:bg-slate-600 w-[6em] h-[2.5em] rounded-md text-white text-xl"
          onClick={onConfirm}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}

export default ConfirmarModal;
