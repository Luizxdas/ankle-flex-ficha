CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fichas (
    id INTEGER NOT NULL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS identidade (
    id SERIAL PRIMARY KEY,
    ficha_id INTEGER NOT NULL,
    nome_paciente TEXT NOT NULL,
    data_ficha DATE NOT NULL,
    telefone TEXT,
    FOREIGN KEY (ficha_id) REFERENCES fichas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS caracteristicas (
    id SERIAL PRIMARY KEY,
    ficha_id INTEGER NOT NULL,
    idade INTEGER,
    sexo CHAR(1),
    altura INTEGER,
    peso INTEGER,
    FOREIGN KEY (ficha_id) REFERENCES fichas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS localizacao (
    id SERIAL PRIMARY KEY,
    ficha_id INTEGER NOT NULL,
    endereco TEXT,
    n_endereco INTEGER,
    cep TEXT,
    bairro TEXT,
    cidade TEXT,
    estado CHAR(2),
    FOREIGN KEY (ficha_id) REFERENCES fichas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS informacoes (
    id SERIAL PRIMARY KEY,
    ficha_id INTEGER NOT NULL,
    lado CHAR(1),
    n_pe INTEGER,
    causa_amputacao TEXT,
    tempo TEXT,
    preco NUMERIC(15, 2),
    data_entrega DATE,
    FOREIGN KEY (ficha_id) REFERENCES fichas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    ficha_id INTEGER NOT NULL,
    produto TEXT,
    tipo TEXT,
    FOREIGN KEY (ficha_id) REFERENCES fichas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tipos (
    id SERIAL PRIMARY KEY,
    ficha_id INTEGER NOT NULL,
    pe TEXT,
    joelho TEXT,
    quadril TEXT,
    encaixe TEXT,
    liner TEXT,
    n_liner INTEGER,
    FOREIGN KEY (ficha_id) REFERENCES fichas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS observacoes (
    id SERIAL PRIMARY KEY,
    ficha_id INTEGER NOT NULL,
    protese TEXT,
    ortese TEXT,
    colete TEXT,
    palmilha TEXT,
    verso TEXT,
    FOREIGN KEY (ficha_id) REFERENCES fichas(id) ON DELETE CASCADE
);
