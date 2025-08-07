const dataAtual = () => {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, "0");
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const ano = hoje.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

const dadosForm = {
  // Tabela: identidade
  nome_paciente: { valor: "", tabela: "identidade" },
  data_ficha: { valor: dataAtual(), tabela: "identidade" },
  telefone: { valor: "", tabela: "identidade" },
  ficha_id: { valor: "", tabela: "identidade" },

  // Tabela: caracteristicas
  idade: { valor: "", tabela: "caracteristicas" },
  sexo: { valor: "", tabela: "caracteristicas" },
  altura: { valor: "", tabela: "caracteristicas" },
  peso: { valor: "", tabela: "caracteristicas" },

  // Tabela: localizacao
  endereco: { valor: "", tabela: "localizacao" },
  n_endereco: { valor: "", tabela: "localizacao" },
  cep: { valor: "", tabela: "localizacao" },
  bairro: { valor: "", tabela: "localizacao" },
  cidade: { valor: "", tabela: "localizacao" },
  estado: { valor: "", tabela: "localizacao" },

  // Tabela: informacoes
  lado: { valor: "", tabela: "informacoes" },
  n_pe: { valor: "", tabela: "informacoes" },
  causa_amputacao: { valor: "", tabela: "informacoes" },
  tempo: { valor: "", tabela: "informacoes" },
  preco: { valor: "", tabela: "informacoes" },
  data_entrega: { valor: "", tabela: "informacoes" },

  // Tabela: produtos
  // PRÓTESE
  dedos: { valor: false, tabela: "produtos", tipo: "Prótese" },
  metatarsiana: { valor: false, tabela: "produtos", tipo: "Prótese" },
  lisfranc: { valor: false, tabela: "produtos", tipo: "Prótese" },
  chopart: { valor: false, tabela: "produtos", tipo: "Prótese" },
  syme: { valor: false, tabela: "produtos", tipo: "Prótese" },
  transtibial: { valor: false, tabela: "produtos", tipo: "Prótese" },
  desarticulacao_joelho: { valor: false, tabela: "produtos", tipo: "Prótese" },
  transfemural: { valor: false, tabela: "produtos", tipo: "Prótese" },
  desarticulacao_quadril: { valor: false, tabela: "produtos", tipo: "Prótese" },
  hemipelvectomia: { valor: false, tabela: "produtos", tipo: "Prótese" },

  // ÓRTESE
  smo: { valor: false, tabela: "produtos", tipo: "Órtese" },
  afo_fixo: { valor: false, tabela: "produtos", tipo: "Órtese" },
  safo: { valor: false, tabela: "produtos", tipo: "Órtese" },
  afo_articulado: { valor: false, tabela: "produtos", tipo: "Órtese" },
  brace_joelho: { valor: false, tabela: "produtos", tipo: "Órtese" },
  kafo: { valor: false, tabela: "produtos", tipo: "Órtese" },
  hkafo: { valor: false, tabela: "produtos", tipo: "Órtese" },
  unilateral: { valor: false, tabela: "produtos", tipo: "Órtese" },
  bilateral: { valor: false, tabela: "produtos", tipo: "Órtese" },

  // COLETE
  lombo_sacro: { valor: false, tabela: "produtos", tipo: "Colete" },
  lombar: { valor: false, tabela: "produtos", tipo: "Colete" },
  toraco_lombar: { valor: false, tabela: "produtos", tipo: "Colete" },
  toraco_cervical: { valor: false, tabela: "produtos", tipo: "Colete" },
  cervical: { valor: false, tabela: "produtos", tipo: "Colete" },
  colete_3d_corretivo: { valor: false, tabela: "produtos", tipo: "Colete" },

  // PALMILHA
  arco_plantar: { valor: false, tabela: "produtos", tipo: "Palmilha" },
  arco_e_botao_metatarsiano: {
    valor: false,
    tabela: "produtos",
    tipo: "Palmilha",
  },
  valente_valente_apoio_aboboda_plantar: {
    valor: false,
    tabela: "produtos",
    tipo: "Palmilha",
  },
  apoio_aboboda_plantar_u_assimetrico: {
    valor: false,
    tabela: "produtos",
    tipo: "Palmilha",
  },
  apoio_1_4_esfera: { valor: false, tabela: "produtos", tipo: "Palmilha" },

  // Tabela: tipos
  pe: { valor: "", tabela: "tipos" },
  joelho: { valor: "", tabela: "tipos" },
  quadril: { valor: "", tabela: "tipos" },
  encaixe: { valor: "", tabela: "tipos" },
  liner: { valor: "", tabela: "tipos" },
  n_liner: { valor: "", tabela: "tipos" },

  // Tabela: observacoes
  protese: { valor: "", tabela: "observacoes" },
  ortese: { valor: "", tabela: "observacoes" },
  colete: { valor: "", tabela: "observacoes" },
  palmilha: { valor: "", tabela: "observacoes" },
  verso: { valor: "", tabela: "observacoes" },
};

export default dadosForm;
