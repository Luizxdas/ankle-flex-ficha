function Modal({ tipo, onClose, onConfirm, isLoading, erro }) {
  return (
    <div className="flex justify-center items-center rounded-md w-[27rem] h-[15rem] bg-slate-200">
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <span className="w-3 h-3 bg-blue-700 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-3 h-3 bg-blue-700 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-3 h-3 bg-blue-700 rounded-full animate-bounce"></span>
        </div>
      ) : erro ? (
        <div className="flex flex-col justify-center items-center gap-2 p-6">
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 text-white text-2xl font-bold">
            ✕
          </span>
          <span>Erro durante o envio!</span>
          <span className="text-xl mt-1 mb-2">{erro}</span>
          <div className="flex flex-row gap-20">
            <button
              className="bg-slate-500 hover:bg-slate-600 p-2 rounded-md text-white text-xl"
              onClick={onClose}
            >
              Voltar
            </button>
          </div>
        </div>
      ) : tipo === "dados_faltando" ? (
        <div className="flex flex-col justify-center items-center gap-2 p-6">
          <span className="w-10 h-10 mt-2 flex items-center justify-center rounded-full bg-yellow-400 text-white text-xl font-bold">
            !
          </span>
          <span className="text-lg mt-1">
            Alguns dados importantes como nome, data ou telefone estão faltando.
            Deseja salvar mesmo assim?
          </span>
          <div className="flex flex-row justify-between w-[12em]">
            <button
              className="bg-slate-500 hover:bg-slate-600 w-[4em] mt-2 p-2 rounded-md text-white text-xl"
              onClick={onClose}
            >
              Voltar
            </button>
            <button
              className="bg-slate-500 hover:bg-slate-600 w-[4em] mt-2 p-2 rounded-md text-white text-xl"
              onClick={onConfirm}
            >
              Salvar
            </button>
          </div>
        </div>
      ) : tipo === "n_ficha" ? (
        <div className="flex flex-col justify-center items-center gap-2 p-6">
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 text-white text-2xl font-bold">
            ✕
          </span>
          <span className="text-lg mt-2">Preencha o número da ficha!</span>
          <button
            className="bg-slate-500 hover:bg-slate-600 w-[4em] mt-6 p-2 rounded-md text-white text-xl"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-2 p-6">
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 text-white text-xl font-bold">
            ✓
          </span>
          <span className="text-xl mt-1 mb-2">Dados enviados com sucesso!</span>
          <button
            className="bg-slate-500 hover:bg-slate-600 w-[4em] mt-4 p-2 rounded-md text-white text-xl"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
}

export default Modal;
