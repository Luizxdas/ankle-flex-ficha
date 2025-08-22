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
  window.print();
};

export const formatarCampo = (nome, valor) => {
  switch (nome) {
    case "cep":
      return valor.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2");
    case "telefone":
      return valor
        .replace(/\D/g, "")
        .slice(0, 11)
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    case "data_ficha":
    case "data_entrega":
      return valor
        .replace(/\D/g, "")
        .slice(0, 8)
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{2})(\d)/, "$1/$2");
    case "preco":
      return parseFloat(valor.replace(/\D/g, "") / 100).toLocaleString(
        "pt-BR",
        { style: "currency", currency: "BRL" }
      );
    default:
      return valor;
  }
};

export function formatarPreco(valor) {
  if (!valor) {
    return 0;
  }

  const apenasNumerosEVirgula = String(valor).replace(/[^\d,]/g, "");

  const valorComPonto = apenasNumerosEVirgula.replace(",", ".");

  const numero = parseFloat(valorComPonto);

  const valorEmCentavos = Math.round(numero * 100);

  return valorEmCentavos;
}
