CREATE TABLE IF NOT EXISTS fichas (
    id INTEGER PRIMARY KEY AUTOINCREMENT
);

CREATE TABLE IF NOT EXISTS identidade (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ficha_id INTEGER NOT NULL,
    nome_paciente TEXT NOT NULL,
    data_ficha TEXT NOT NULL,
    telefone TEXT,
    FOREIGN KEY (ficha_id) REFERENCES fichas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS caracteristicas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ficha_id INTEGER NOT NULL,
    idade INTEGER,
    sexo TEXT,
    altura INTEGER,
    peso INTEGER,
    FOREIGN KEY (ficha_id) REFERENCES fichas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS localizacao (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ficha_id INTEGER NOT NULL,
    endereco TEXT,
    n_endereco INTEGER,
    cep TEXT,
    bairro TEXT,
    cidade TEXT,
    estado TEXT,
    FOREIGN KEY (ficha_id) REFERENCES fichas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS informacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ficha_id INTEGER NOT NULL,
    lado TEXT,
    n_pe INTEGER,
    causa_amputacao TEXT,
    tempo TEXT,
    preco REAL,
    data_entrega TEXT,
    FOREIGN KEY (ficha_id) REFERENCES fichas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ficha_id INTEGER NOT NULL,
    produto TEXT,
    tipo TEXT,
    FOREIGN KEY (ficha_id) REFERENCES fichas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tipos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ficha_id INTEGER NOT NULL,
    protese TEXT,
    ortese TEXT,
    colete TEXT,
    palmilha TEXT,
    verso TEXT,
    FOREIGN KEY (ficha_id) REFERENCES fichas(id) ON DELETE CASCADE
);