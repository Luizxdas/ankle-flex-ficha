import { useState } from "react";

function Option({ name, content }) {
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
  };

  return (
    <label className="flex items-center justify-between cursor-pointer border-black text-start">
      <input
        type="checkbox"
        name={name}
        value={content}
        className="hidden peer"
        checked={checked}
        onChange={handleChange}
      />
      <span className="text-lg p-1">{content}</span>
      <div className="w-10 h-10 pr-1 border-black flex items-center justify-center peer-checked:[&]:after:content-['X'] peer-checked:text-black peer-checked:text-4xl"></div>
    </label>
  );
}

export default Option;
