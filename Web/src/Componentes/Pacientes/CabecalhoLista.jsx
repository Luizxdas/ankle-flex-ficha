function CabecalhoLista() {
  const divStyle = "h-full flex flex-row justify-center mt-1";

  return (
    <div className="flex flex-row justify-between bg-slate-300 h-[2em]">
      <div className={`${divStyle} w-[6em]`}>
        <h1>Nº FICHA</h1>
      </div>
      <div className={`${divStyle} w-[30em]`}>
        <h1>NOME</h1>
      </div>
      <div className={`${divStyle} w-[12em]`}>
        <h1>PRODUTOS</h1>
      </div>
      <div className={`${divStyle} w-[10em]`}>
        <h1>DATA DA FICHA</h1>
      </div>
    </div>
  );
}

export default CabecalhoLista;
