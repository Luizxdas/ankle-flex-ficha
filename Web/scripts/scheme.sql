CREATE TABLE IF NOT EXISTS identidade (
    n_ficha INTEGER PRIMARY KEY,
    nome_paciente TEXT NOT NULL,
    data_ficha DATE NOT NULL,
    telefone TEXT
);

CREATE TABLE IF NOT EXISTS caracteristicas (
    id SERIAL PRIMARY KEY,
    n_ficha INTEGER NOT NULL,
    idade INTEGER,
    sexo CHAR(1),
    altura DECIMAL(5,2),
    peso INTEGER,
    FOREIGN KEY (n_ficha) REFERENCES identidade(n_ficha) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS localizacao (
    id SERIAL PRIMARY KEY,
    n_ficha INTEGER NOT NULL,
    endereco TEXT,
    n_endereco INTEGER,
    cep TEXT,
    bairro TEXT,
    cidade TEXT,
    estado CHAR(2),
    FOREIGN KEY (n_ficha) REFERENCES identidade(n_ficha) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS informacoes (
    id SERIAL PRIMARY KEY,
    n_ficha INTEGER NOT NULL,
    lado CHAR(1),
    n_pe TEXT,
    causa_amputacao TEXT,
    tempo TEXT,
    preco NUMERIC(15, 2),
    data_entrega DATE,
    FOREIGN KEY (n_ficha) REFERENCES identidade(n_ficha) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    n_ficha INTEGER NOT NULL,
    produto TEXT,
    tipo TEXT,
    FOREIGN KEY (n_ficha) REFERENCES identidade(n_ficha) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tipos (
    id SERIAL PRIMARY KEY,
    n_ficha INTEGER NOT NULL,
    pe TEXT,
    joelho TEXT,
    quadril TEXT,
    encaixe TEXT,
    liner TEXT,
    n_liner INTEGER,
    FOREIGN KEY (n_ficha) REFERENCES identidade(n_ficha) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS observacoes (
    id SERIAL PRIMARY KEY,
    n_ficha INTEGER NOT NULL,
    protese TEXT,
    ortese TEXT,
    colete TEXT,
    palmilha TEXT,
    verso TEXT,
    FOREIGN KEY (n_ficha) REFERENCES identidade(n_ficha) ON DELETE CASCADE
);
