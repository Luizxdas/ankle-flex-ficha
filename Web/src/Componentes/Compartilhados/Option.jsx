function Option({ name, content }) {
  return (
    <label className="flex items-center justify-between cursor-pointer border-black text-start">
      <input
        data-testid={content}
        type="checkbox"
        name={name}
        value={content}
        className="hidden peer"
      />
      <span className="text-lg p-1">{content}</span>
      <div className="w-10 h-10 pr-1 border-black flex items-center justify-center peer-checked:[&]:after:content-['X'] peer-checked:text-black peer-checked:text-4xl"></div>
    </label>
  );
}

export default Option;
