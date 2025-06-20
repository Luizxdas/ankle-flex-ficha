export const inputStyle = "h-[1.5em] ml-[4px] uppercase";
export const vFormStyle = "w-[15em] border-[1.5px] border-black rounded-md";
export const baseFormStyle =
  "h-[31em] rounded-md select-none text-start divide-y";

export const limparFicha = (formRef) => {
  if (!formRef) {
    console.error("formRef não recebido.");
    return;
  }

  sessionStorage.removeItem("dados");

  const inputs = formRef.current.querySelectorAll(
    "input, textarea, select, checkbox"
  );

  inputs.forEach((input) => {
    if (input.type === "checkbox" || input.type === "radio") {
      input.checked = false;
    } else {
      input.value = "";
    }
  });
};

export const imprimir = () => {
  window.print;
};

export function formatarPreco(e) {
  if (!e.target.value) {
    return null;
  }

  let valor = e.target.value.replace(/\D/g, "");

  const valorNumerico = parseFloat(valor) / 100;

  e.target.value = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valorNumerico);
}

export function formatarData(e) {
  let valor = e.target.value.replace(/\D/g, "");

  if (valor.length > 2) valor = valor.slice(0, 2) + "/" + valor.slice(2);
  if (valor.length > 5) valor = valor.slice(0, 5) + "/" + valor.slice(5);
  if (valor.length > 10) valor = valor.slice(0, 10);

  e.target.value = valor;
}
