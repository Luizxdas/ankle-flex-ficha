export const inputStyle = "h-[1.5em] ml-[4px] uppercase";
export const vFormStyle = "w-[15em] border-[1.5px] border-black rounded-md";
export const baseFormStyle =
  "h-[31em] rounded-md select-none text-start divide-y";

export const preencherFormulario = (dados, frenteRef, versoRef) => {
  if (!dados || !frenteRef?.current || !versoRef?.current) {
    console.warn(
      "Dados ou referências inválidas para preenchimento do formulário"
    );
    return;
  }

  const getInput = (selector) =>
    frenteRef.current?.querySelector(selector) ||
    versoRef.current?.querySelector(selector);

  const preencherValor = (elemento, valor) => {
    if (!elemento) {
      console.warn(`Elemento não encontrado para o valor: ${valor}`);
      return false;
    }

    if (elemento.type === "checkbox") {
      elemento.checked = true;
    } else {
      elemento.value = valor;
    }
    return true;
  };

  const preencherProdutos = (valor) => {
    let produtos = valor.produto;

    if (typeof produtos === "string") {
      produtos = produtos
        .replace(/^\[\s*|\s*\]$/g, "")
        .split(",")
        .map((p) => p.trim().replace(/^"|"$/g, ""));
    }

    produtos.forEach((p) => {
      const input = getInput(`input[value="${p}"]`);
      preencherValor(input);
    });
  };

  const preencherTipos = (valor) => {
    Object.entries(valor).forEach(([chave, descricao]) => {
      const nome = chave.toLowerCase();
      const input = getInput(`input[name="${nome}"]`);
      preencherValor(input, descricao);
    });
  };

  const preencherObservacoes = (conteudo) => {
    Object.entries(conteudo).forEach(([chave, descricao]) => {
      if (descricao) {
        const nome = `obs_${chave.toLowerCase()}`;
        const input = getInput(`textarea[name="${nome}"]`);
        preencherValor(input, descricao);
      }
    });
  };

  const preencherOutros = (item, valor) => {
    const nome = item.toLowerCase();
    if (nome === "n_ficha") {
      let input = frenteRef.current?.querySelector(`input[name="${nome}"]`);
      input.value = valor;
      input = versoRef.current?.querySelector(`input[name="${nome}"]`);
      input.value = valor;
      return;
    }
    if (nome === "data_ficha") {
      const data = new Date(valor).toLocaleDateString();
      const input = getInput(`input[name="${nome}"]`);
      preencherValor(input, data);
      return;
    }
    const input = getInput(`input[name="${nome}"]`);
    preencherValor(input, valor);
  };

  Object.entries(dados).forEach(([grupo, conteudo]) => {
    Object.entries(conteudo).forEach(([item, valor]) => {
      switch (grupo) {
        case "produtos":
          preencherProdutos(valor);
          break;
        case "tipos":
          preencherTipos(valor);
          break;
        case "observacoes":
          preencherObservacoes(conteudo);
          break;
        default:
          preencherOutros(item, valor);
      }
    });
  });
};

export const checarObrigatorio = () => {
  const n_ficha = document.getElementById("n_ficha").value.trim();
  const nome_paciente = document.getElementById("nome_paciente").value.trim();
  const data_ficha = document.getElementById("data_ficha").value.trim();
  const telefone = document.getElementById("telefone").value.trim();

  if (!n_ficha) {
    return "n_ficha";
  } else if (!nome_paciente || !data_ficha || !telefone) {
    return false;
  }

  return true;
};

export const guardarFicha = (formRef, lado) => {
  if (!formRef?.current || !lado) {
    console.log("formRef ou lado não recebidos: ", formRef, lado);
    return false;
  }

  const formData = new FormData(formRef.current);
  const novosDados = Object.fromEntries(formData.entries());

  const dadosSalvos = JSON.parse(sessionStorage.getItem("dados")) || {};

  const dadosAtualizados = {
    ...dadosSalvos,
    [lado === "frente" ? "dadosFrente" : "dadosVerso"]: {
      ...(dadosSalvos[lado === "frente" ? "dadosFrente" : "dadosVerso"] || {}),
      ...novosDados,
    },
  };

  sessionStorage.setItem("dados", JSON.stringify(dadosAtualizados));

  return true;
};

export const limparFicha = (formRef, lado) => {
  if (!formRef?.current || !lado) {
    console.error("formRef ou lado não recebidos.");
    return;
  }

  const dados = JSON.parse(sessionStorage.getItem("dados")) || {};

  if (lado === "frente") {
    delete dados.dadosFrente;
  } else {
    delete dados.dadosVerso;
  }

  sessionStorage.setItem("dados", JSON.stringify(dados));

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

export function formatarData(e) {
  let valor = e.target.value.replace(/\D/g, "");

  if (valor.length > 2) valor = valor.slice(0, 2) + "/" + valor.slice(2);
  if (valor.length > 5) valor = valor.slice(0, 5) + "/" + valor.slice(5);
  if (valor.length > 10) valor = valor.slice(0, 10);

  e.target.value = valor;
}
