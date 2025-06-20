const Observacoes = ({ id, name }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1 font-medium">
        Observações:
      </label>
      <textarea
        name={name}
        id={id}
        className="w-56 border-none font-normal border-gray-400 rounded-md resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={1}
      />
    </div>
  );
};

export default Observacoes;
