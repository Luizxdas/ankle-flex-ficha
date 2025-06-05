import { useState, useRef, useEffect } from "react";

const Observacoes = ({ id, name }) => {
  const [text, setText] = useState("");
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1 font-medium">
        Observações:
      </label>
      <textarea
        name={name}
        id={id}
        ref={textAreaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-56 border-none font-normal border-gray-400 rounded-md resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={1}
      />
    </div>
  );
};

export default Observacoes;
