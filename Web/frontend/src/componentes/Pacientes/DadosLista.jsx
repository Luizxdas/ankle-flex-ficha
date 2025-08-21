function DadosLista({ handleClick, item, ativo, index }) {
  let bgColor = "";

  if (ativo === item) {
    bgColor = "bg-blue-400";
  } else {
    bgColor = index % 2 === 0 ? "bg-slate-400" : "bg-slate-300";
  }

  return (
    <button
      onClick={() => handleClick(item)}
      key={item.ficha_id}
      className={`flex justify-between h-[2em] pt-1 ${bgColor}`}
    >
      <span className="w-[6em] text-center">{item.id}</span>
      <span className="w-[30em] text-center">{item.nome}</span>
      <span className="w-[14em] text-center overflow-hidden whitespace-nowrap text-ellipsis">
        {[...new Set(item.tipo_produto)].join(", ") || "Sem produtos"}
      </span>
      <span className="w-[10em] text-center">
        {(() => {
          const [ano, mes, dia] = item.data.split("-");
          return `${dia}/${mes}/${ano}`;
        })()}
      </span>
    </button>
  );
}

export default DadosLista;
