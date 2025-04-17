import { inputStyle } from "../../utils";

function CampoForm({ content, id, name, width, border }) {
  return (
    <div className={`${border ? "border-black border-b-[1.5px]" : ""}`}>
      <label htmlFor={id} className="mx-2">
        {content}
        <input
          id={id}
          name={name}
          className={`${inputStyle}`}
          style={{ width }}
        />
      </label>
    </div>
  );
}

export default CampoForm;
