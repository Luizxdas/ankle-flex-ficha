export const inputStyle = "h-[1.5em] ml-[4px] uppercase";
export const vFormStyle = "w-[15em] border-[1.5px] border-black rounded-md";
export const baseFormStyle =
  "h-[31em] rounded-md select-none text-start divide-y divide-black";

export const preencherFormulario = (dados, formRef) => {
  if (!formRef?.current) return;

  const dadosParaPreencher = dados.data;

  Object.entries(dadosParaPreencher).forEach(([key, value]) => {
    const input = formRef.current.querySelector(`#${key}`);
    if (input) {
      input.value = value;
    } else {
      console.log("Input não encontrado de id: ", key);
    }
  });
};
