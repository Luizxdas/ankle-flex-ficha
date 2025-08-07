function Botao({ onClick, conteudo }) {
  return (
    <button
      onClick={onClick}
      className="text-white w-[9rem] h-[5rem] hover:scale-105 transition-transform duration-200 bg-slate-500 hover:bg-slate-600 font-medium rounded-lg text-md px-4 py-2"
    >
      {conteudo}
    </button>
  );
}

export default Botao;
