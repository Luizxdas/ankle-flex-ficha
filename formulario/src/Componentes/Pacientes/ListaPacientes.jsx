function ListaPacientes() {
  const divStyle = "h-full flex flex-row justify-center mt-1";
  const dados = [
    {
      n_ficha_paciente: 123,
      nome: "João",
      produto: "Palmilha",
      data_ficha: "2025/04/10",
    },
    {
      n_ficha_paciente: 456,
      nome: "Maria",
      produto: "Prótese",
      data_ficha: "2025/04/09",
    },
    // ...
  ];

  return (
    <div className="w-[60em] h-[45em] flex flex-col p-[6px] border-[5px] border-slate-500 rounded-sm">
      <div className="flex flex-row justify-between bg-slate-300 h-[2em]">
        <div className={`${divStyle} w-[6em]`}>
          <h1>Nº FICHA</h1>
        </div>
        <div className={`${divStyle} w-[30em]`}>
          <h1>NOME</h1>
        </div>
        <div className={`${divStyle} w-[12em]`}>
          <h1>PRODUTO</h1>
        </div>
        <div className={`${divStyle} w-[10em]`}>
          <h1>DATA DA FICHA</h1>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-3">
        {dados.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between h-[2em] pt-1 ${
              index % 2 === 0 ? "bg-white" : "bg-slate-300"
            }`}
          >
            <span className="w-[6em] text-center">{item.n_ficha_paciente}</span>
            <span className="w-[30em] text-center">{item.nome}</span>
            <span className="w-[12em] text-center">{item.produto}</span>
            <span className="w-[10em] text-center">{item.data_ficha}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaPacientes;
