import { inputStyle } from "../../utils";

function CampoForm({ content, id, name, width, border, centro }) {
  return (
    <div
      className={`mx-2 ${centro ? "" : "flex"} ${
        border ? "border-black border-b-[1.5px]" : ""
      }`}
    >
      <label htmlFor={id} className="whitespace-nowrap">
        {content}
      </label>
      <input
        id={id}
        name={name}
        className={`${inputStyle}`}
        style={{ width }}
      />
    </div>
  );
}

export default CampoForm;
