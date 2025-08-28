const Observacoes = ({ id, name, value, handleChange }) => {
  return (
    <div className="flex flex-col h-full w-full">
      <label htmlFor={id} className="mb-1 font-medium">
        OBSERVAÇÕES
      </label>
      <textarea
        name={name}
        id={id}
        className="flex-grow rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
export default Observacoes;
