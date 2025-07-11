import { inputStyle } from "../../Utils/utils";

function CampoForm({
  content,
  id,
  name,
  width,
  border,
  handleChange,
  value,
  maxLength,
  type = "text",
  readOnly = false,
  centro = false,

  ...rest
}) {
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
        className={`${inputStyle} ${centro ? "text-center" : ""}`}
        style={{ width }}
        onChange={handleChange}
        value={value}
        maxLength={maxLength}
        type={type}
        readOnly={readOnly}
        {...rest}
      />
    </div>
  );
}

export default CampoForm;
