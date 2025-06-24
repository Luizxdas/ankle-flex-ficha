import { render, screen, fireEvent } from "@testing-library/react";
import Ficha from "./Ficha";
import { MemoryRouter } from "react-router-dom";

describe("Formulário Ficha", () => {
  const ficha_id = "1";

  beforeAll(() => {
    window.alert = (msg) => console.log("Alert chamado:", msg);
  });

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Ficha />
      </MemoryRouter>
    );
  });

  function checkOptionByName(name) {
    const checkbox = screen.getByRole("checkbox", { name });
    fireEvent.click(checkbox);
    expect(checkbox.checked).to.be.true;
  }

  function preencherCampo(label, valor) {
    fireEvent.change(screen.getByLabelText(label), {
      target: { value: valor },
    });
  }

  it("deve preencher corretamente os dados pessoais do paciente", () => {
    // Dados pessoais (frente do formulário)
    preencherCampo(/^PACIENTE:$/i, "João da Silva");
    preencherCampo(/^ENDEREÇO:$/i, "Rua Exemplo");
    preencherCampo(/^N:$/i, "123");
    preencherCampo(/^CEP:$/i, "12345-678");
    preencherCampo(/^BAIRRO:$/i, "Centro");
    preencherCampo(/^CIDADE:$/i, "São Paulo");
    preencherCampo(/^ESTADO:$/i, "SP");
    preencherCampo(/^DATA:$/i, "12/05/2025");
    preencherCampo(/^FONE:$/i, "(11)99999-9999");
    expect(screen.getByLabelText(/^PACIENTE:$/i).value).to.equal(
      "João da Silva"
    );
    expect(screen.getByLabelText(/^ENDEREÇO:$/i).value).to.equal("Rua Exemplo");
    expect(screen.getByLabelText(/^CIDADE:$/i).value).to.equal("São Paulo");
  });

  it("deve preencher corretamente os dados clínicos do paciente", () => {
    // Dados clínicos (verso do formulário)
    preencherCampo(/^IDADE:$/i, "30");
    preencherCampo(/^SEXO:$/i, "M");
    preencherCampo(/^ALTURA:$/i, "178");
    preencherCampo(/^PESO:$/i, "85");
    preencherCampo(/^LADO:$/i, "E");
    preencherCampo(/^Nº PÉ:$/i, "38");
    preencherCampo(/^CAUSA DA AMPUTAÇÃO:$/i, "ACIDENTE");
    preencherCampo(/^TEMPO:$/i, "6 MESES");
    expect(screen.getByLabelText(/^IDADE:$/i).value).to.equal("30");
    expect(screen.getByLabelText(/^ALTURA:$/i).value).to.equal("178");
    expect(screen.getByLabelText(/^CAUSA DA AMPUTAÇÃO:$/i).value).to.equal(
      "ACIDENTE"
    );
  });

  it("deve permitir a seleção de opções na seção de prótese", () => {
    checkOptionByName("Dedos");
    checkOptionByName("Desarticulação do Joelho");
    checkOptionByName("Hemipelvectomia");

    expect(screen.getByRole("checkbox", { name: "Dedos" }).checked).to.be.true;
    expect(
      screen.getByRole("checkbox", { name: "Desarticulação do Joelho" }).checked
    ).to.be.true;
    expect(screen.getByRole("checkbox", { name: "Hemipelvectomia" }).checked).to
      .be.true;
  });

  it("deve permitir a seleção de opções nas seções de palmilha e órtese", () => {
    // Opções de palmilha
    checkOptionByName("Apoio 1/4 esféra");
    checkOptionByName("Arco plantar");

    // Opções de órtese
    checkOptionByName("AFO Articulado");
    checkOptionByName("KAFO");
    checkOptionByName("Unilateral");

    expect(screen.getByRole("checkbox", { name: "Apoio 1/4 esféra" }).checked)
      .to.be.true;
    expect(screen.getByRole("checkbox", { name: "Arco plantar" }).checked).to.be
      .true;
    expect(screen.getByRole("checkbox", { name: "AFO Articulado" }).checked).to
      .be.true;
  });

  it("deve permitir a seleção de opções na seção de colete", () => {
    checkOptionByName("Colete 3D (Corretivo)");
    checkOptionByName("Toraco-cervical");

    expect(
      screen.getByRole("checkbox", { name: "Colete 3D (Corretivo)" }).checked
    ).to.be.true;
    expect(screen.getByRole("checkbox", { name: "Toraco-cervical" }).checked).to
      .be.true;
  });

  it("deve permitir preencher todos os campos de observações", () => {
    const observacoes = screen.getAllByLabelText(/^Observações:$/i);
    observacoes.forEach((textarea, index) => {
      fireEvent.change(textarea, {
        target: { value: `Texto para o campo ${index + 1}` },
      });
      expect(textarea.value).to.equal(`Texto para o campo ${index + 1}`);
    });
  });

  it("deve preencher todos os campos e salvar corretamente", () => {
    // Dados pessoais (frente)
    preencherCampo(/^Nº FICHA:$/i, ficha_id);
    preencherCampo(/^PACIENTE:$/i, "João da Silva");
    preencherCampo(/^ENDEREÇO:$/i, "Rua Exemplo");
    preencherCampo(/^N:$/i, "123");
    preencherCampo(/^CEP:$/i, "12345-678");
    preencherCampo(/^BAIRRO:$/i, "Centro");
    preencherCampo(/^CIDADE:$/i, "São Paulo");
    preencherCampo(/^ESTADO:$/i, "SP");
    preencherCampo(/^DATA:$/i, "12/05/2025");
    preencherCampo(/^FONE:$/i, "(11)99999-9999");

    // Dados clínicos (topo do verso)
    preencherCampo(/^IDADE:$/i, "30");
    preencherCampo(/^SEXO:$/i, "M");
    preencherCampo(/^ALTURA:$/i, "178");
    preencherCampo(/^PESO:$/i, "85");
    preencherCampo(/^LADO:$/i, "E");
    preencherCampo(/^Nº PÉ:$/i, "38");
    preencherCampo(/^CAUSA DA AMPUTAÇÃO:$/i, "ACIDENTE");
    preencherCampo(/^TEMPO:$/i, "6 MESES");

    // Dados clínicos (base do verso)
    preencherCampo(/^TIPO DE PÉ:$/i, "Tipo pé");
    preencherCampo(/^TIPO DE JOELHO:$/i, "Tipo joelho");
    preencherCampo(/^TIPO DE QUADRIL:$/i, "Tipo quadril");
    preencherCampo(/^TIPO DE ENCAIXE:$/i, "Tipo encaixe");
    preencherCampo(/^TIPO DE LINER:$/i, "Tipo liner");
    preencherCampo(/^NÚMERO DO LINER:$/i, 12);

    // Marcar uma opção por seção
    checkOptionByName("Dedos");
    checkOptionByName("Apoio 1/4 esféra");
    checkOptionByName("AFO Articulado");
    checkOptionByName("Colete 3D (Corretivo)");

    // Preencher observações
    const observacoes = screen.getAllByLabelText(/^Observações:$/i);
    observacoes.forEach((textarea, index) => {
      fireEvent.change(textarea, {
        target: { value: `Texto para o campo ${index + 1}` },
      });
    });

    // Salvar o formulário e enviar para o banco de dados
    fireEvent.click(screen.getByRole("button", { name: /Salvar/i }));

    // Verificar se os dados foram salvos corretamente
    const dados = JSON.parse(sessionStorage.getItem("dados"));
    console.log(dados);
    expect(dados).to.not.be.null;
  });
});
