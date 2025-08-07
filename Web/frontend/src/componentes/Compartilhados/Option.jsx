function Option({ name, value, checked, handleChange }) {
  return (
    <label className="flex items-center justify-between cursor-pointer border-black text-start">
      <input
        data-testid={value}
        type="checkbox"
        name={name}
        value={value}
        className="hidden peer"
        checked={checked}
        onChange={handleChange}
      />
      <span className="text-lg p-1">{value}</span>
      <div className="w-10 h-10 pr-1 border-black flex items-center justify-center peer-checked:[&]:after:content-['X'] peer-checked:text-black peer-checked:text-4xl"></div>
    </label>
  );
}

export default Option;
