function SucessoModal({ onClose }) {
  return (
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
  );
}

export default SucessoModal;
