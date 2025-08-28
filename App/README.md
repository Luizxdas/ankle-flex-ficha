# Ficha Ortopédica Versão App

Projeto desenvolvido para uma empresa de produtos ortopédicos, com o objetivo de gerenciar fichas de pacientes de forma moderna, eficiente e segura. O sistema permite **criar**, **visualizar**, **editar** e **imprimir** fichas de pacientes. Inclui também um redesign completo da ficha para atender às novas demandas do cliente.

## Índice

- [Documentação](#documentação)
- [Tecnologias Utilizadas](#️tecnologias-utilizadas)
- [Como Rodar o Projeto Localmente](#️como-rodar-o-projeto-localmente)
- [Contato](#contato)
- [Licença](#licença)

---

## Documentação

- [Página Inicial](./)
- [Versão Web](./Web/README.md) – aplicação web (Spring Boot + PostgreSQL)
- [Versão Desktop App](./App/README.md) – aplicação desktop (Electron + SQLite)

---

## Tecnologias Utilizadas

**Frontend**: React, Vite, TailwindCSS, JavaScript

**Backend**: Java, Spring Boot, Electron

**Banco de dados**: SQLite

---

## Como Rodar o Projeto Localmente

1.  **Clone o Repositório:**

    ```bash
    git clone [https://github.com/Luizxdas/ankle-flex-ficha](https://github.com/Luizxdas/ankle-flex-ficha)
    cd App
    ```

2.  **Iniciar os Contêineres:**

    ```bash
    docker-compose up --build
    ```

    Este comando irá construir as imagens Docker (se necessário) e iniciar o backend e o frontend.

3.  **Iniciar Electron:**

    ```bash
    npm start
    ```

---

## Contato

Luiz Augusto - [luizxdas@outlook.com]
LinkedIn - [https://www.linkedin.com/in/luizxdas/]

---

## Licença

Este projeto foi desenvolvido sob encomenda e fins profissionais, mas a estrutura, o código e a arquitetura podem ser utilizados como referência educacional.
