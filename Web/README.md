# Ficha Ortopédica

Uma aplicação web desenvolvida para uma empresa de produtos ortopédicos, com o objetivo de gerenciar fichas de pacientes de forma moderna, eficiente e segura.

🌐 Projeto em desenvolvimento — atualmente na versão 3, com 80-90% de conclusão.

---

## 🧾 Descrição

O sistema permite **criar**, **visualizar**, **editar** e **imprimir** fichas de pacientes (frente e verso). Inclui também um redesign completo da ficha para atender às novas demandas do cliente. A aplicação já está 100% funcional e atualmente passa por uma reestruturação na API visando melhorias de segurança e escalabilidade.

---

## ⚙️ Tecnologias Utilizadas

- 🖥️ **Front-end**: React, Vite, TailwindCSS, JavaScript
  🖨️ **Versão app local (v1)**: Electron + SQLite
- 🔧 **Back-end (v2)**: Express.js + SQLite
- 🔧 **Back-end (v3 em andamento)**: Spring Boot, Java, Spring Security, JWT, PostgreSQL

---

## 📌 Funcionalidades

- 🧍‍♂️ **Cadastro de Fichas**: Criação e edição de fichas ortopédicas.
- 📄 **Exibição Detalhada**: Visualização da ficha diretamente no navegador.
- 🖨️ **Impressão da Ficha**: Impressão da frente e verso com os dados preenchidos.
- 🔒 **Autenticação (em desenvolvimento)**: Integração com JWT e Spring Security.
- 🎨 **Redesign Profissional**: Novo layout da ficha conforme as necessidades atuais da empresa.

---

## 🛠️ Habilidades Demonstradas

- Integração completa entre front-end e back-end via APIs REST.
- Migração de back-end de Express.js para Spring Boot com foco em segurança.
- Implementação e gerenciamento de bancos de dados SQLite (local) e PostgreSQL (remoto).
- Deploy de aplicações full-stack e desenvolvimento multiplataforma (web e desktop com Electron).
- Aplicação de CORS, autenticação com JWT e boas práticas de segurança.

---

## 🌟 Estrutura do Projeto

Este projeto evoluiu ao longo do tempo e está organizado em versões:

- **v1 - Desktop Local**: Aplicação em Electron com banco de dados local (SQLite).
- **v2 - Web App**: Front-end em React, back-end em Express.js com SQLite/PostgreSQL.
- **v3 - Versão Final** (em andamento): Back-end migrado para Spring Boot com autenticação JWT.

---

## 🔗 Integração Front-end e Back-end

- O front-end realiza chamadas à API para operações de CRUD das fichas.
- Requisições configuradas para ambientes locais e futuros ambientes de produção.
- A autenticação será implementada com JWT protegendo rotas e acessos.

---

## 📜 Licença

Este projeto foi desenvolvido sob encomenda e fins profissionais, mas a estrutura, o código e a arquitetura podem ser utilizados como referência educacional.
