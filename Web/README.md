# Ficha Ortopédica Versão Web

Versão Web do projeto desenvolvido para uma empresa de produtos ortopédicos, com o objetivo de gerenciar fichas de pacientes de forma moderna, eficiente e segura. O sistema permite **criar**, **visualizar**, **editar** e **imprimir** fichas de pacientes. Inclui também um redesign completo da ficha para atender às novas demandas do cliente.

## Índice

- [Documentação](#documentação)
- [Tecnologias Utilizadas](#️tecnologias-utilizadas)
- [Como Rodar o Projeto Localmente](#️como-rodar-o-projeto-localmente-docker)
- [Deploy em Produção](#deploy-em-produção)
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

**Backend**: Java, Spring Boot, JWT

**Banco de dados**: PostgreSQL

---

## Como Rodar o Projeto Localmente (Docker)

Certifique-se de ter o **Docker** e o **Docker Compose** instalados em sua máquina.

1.  **Clone o Repositório:**

    ```bash
    git clone [https://github.com/Luizxdas/ankle-flex-ficha](https://github.com/Luizxdas/ankle-flex-ficha)
    cd Web
    ```

2.  **Configurar Variáveis de Ambiente:**

    Crie um arquivo .env na raiz da versão Web do projeto (ankle-flex-ficha\Web) com base no arquivo .env.example.

    - `JWT_SECRET` → chave secreta para geração e validação de tokens JWT.
    - `SPRING_DATASOURCE_URL` → URL de conexão com o banco de dados.
    - `SPRING_DATASOURCE_USERNAME` → usuário do banco de dados.
    - `SPRING_DATASOURCE_PASSWORD` → senha do banco de dados.

    ### Exemplo

    DB_NAME=ficha_db
    SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/ficha_db
    SPRING_DATASOURCE_USERNAME=usuario
    SPRING_DATASOURCE_PASSWORD=senha
    JWT_SECRET=segredojwt

3.  **Iniciar os Contêineres:**

    ```bash
    docker-compose up --build
    ```

    Este comando irá construir as imagens Docker (se necessário) e iniciar o backend, frontend e o banco de dados.

4.  **Acessar a Aplicação:**

    - **Frontend:** `http://localhost:5173` (ou a porta que você configurou)
    - **Backend API:** `http://localhost:8080/api` (ou a porta que você configurou)

---

## Deploy em Produção

As imagens Docker são fornecidas através deste repositório. Para deploy em ambiente de produção, considere:

- **Imagens Docker:** As imagens podem ser construídas a partir dos `Dockerfile`s em `backend/` e `frontend/`.
- **Variáveis de Ambiente:** As variáveis de ambiente listadas acima devem ser configuradas no ambiente de produção.
- **Banco de Dados:** A aplicação espera um banco de dados PostgreSQL.
- **Portas:** Backend na porta 8080, Frontend servido na porta 5173 (ou configurada para o servidor web).

---

## Contato

Luiz Augusto - [luizxdas@outlook.com]
LinkedIn - [https://www.linkedin.com/in/luizxdas/]

---

## Licença

Este projeto foi desenvolvido sob encomenda e fins profissionais, mas a estrutura, o código e a arquitetura podem ser utilizados como referência educacional.
