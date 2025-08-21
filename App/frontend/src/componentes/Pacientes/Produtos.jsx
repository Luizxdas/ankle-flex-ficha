function Produtos({ produtos, setProdutos }) {
  const handleProdutos = (e) => {
    if (produtos.length > 0) {
      const checar = produtos.includes(e.target.name);
      checar
        ? setProdutos(produtos.filter((p) => p !== e.target.name))
        : setProdutos([...produtos, e.target.name]);
    } else {
      setProdutos([...produtos, e.target.name]);
    }
  };

  return (
    <div className="flex flex-row gap-x-12 text-lg text-gray-900 select-none">
      <div className="flex gap-x-1">
        <input
          id="protese"
          name="Prótese"
          type="checkbox"
          onChange={handleProdutos}
        />
        <label htmlFor="protese">Prótese</label>
      </div>
      <div className="flex gap-x-1">
        <input
          id="ortese"
          name="Órtese"
          type="checkbox"
          onChange={handleProdutos}
        />
        <label htmlFor="ortese">Órtese</label>
      </div>
      <div className="flex gap-x-1">
        <input
          id="colete"
          name="Colete"
          type="checkbox"
          onChange={handleProdutos}
        />
        <label htmlFor="colete">Colete</label>
      </div>
      <div className="flex gap-x-1">
        <input
          id="palmilha"
          name="Palmilha"
          type="checkbox"
          onChange={handleProdutos}
        />
        <label htmlFor="palmilha">Palmilha</label>
      </div>
    </div>
  );
}

export default Produtos;
