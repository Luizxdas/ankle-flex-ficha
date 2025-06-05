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
      <span className="w-[6em] text-center">{item.N_FICHA}</span>
      <span className="w-[30em] text-center">{item.NOME_PACIENTE}</span>
      <span className="w-[14em] text-center overflow-hidden whitespace-nowrap text-ellipsis">
        {item.produtos
          .map((p) => mapa[p.TIPO.toLowerCase()] || p.TIPO)
          .join(", ") || "Sem produtos"}
      </span>
      <span className="w-[10em] text-center">{item.DATA_FICHA}</span>
    </button>
  );
}

export default DadosLista;
