function ErroModal({ erro, onClose }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <span className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 text-white text-2xl font-bold mt-7">
        ✕
      </span>
      <span className="text-xl mt-1">{erro}</span>
      <div className="flex flex-row mt-7">
        <button
          className="bg-slate-500 hover:bg-slate-600 w-[5em] h-[2.5em] rounded-md text-white text-xl"
          onClick={onClose}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

export default ErroModal;
