function DadosLista({ handleClick, item, ativo, index }) {
  let bgColor = "";

  const mapa = {
    protese: "Prótese",
    ortese: "Órtese",
    palmilha: "Palmilha",
    colete: "Colete",
  };

  if (ativo === item) {
    bgColor = "bg-blue-400";
  } else {
    bgColor = index % 2 === 0 ? "bg-slate-400" : "bg-slate-300";
  }

  return (
    <button
      onClick={() => handleClick(item)}
      key={item.N_FICHA}
      className={`flex justify-between h-[2em] pt-1 ${bgColor}`}
    >
      <span className="w-[6em] text-center">{item.n_ficha}</span>
      <span className="w-[30em] text-center">{item.nome_paciente}</span>
      <span className="w-[14em] text-center overflow-hidden whitespace-nowrap text-ellipsis">
        {item.produtos
          .map((p) => mapa[p.tipo.toLowerCase()] || p.tipo)
          .join(", ") || "Sem produtos"}
      </span>
      <span className="w-[10em] text-center">
        {new Date(item.data_ficha).toLocaleDateString("pt-BR")}
      </span>
    </button>
  );
}

export default DadosLista;
