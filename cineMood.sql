CREATE TABLE Administrador (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Login VARCHAR(100) NOT NULL,
    SenhaHash VARCHAR(255) NOT NULL
);

CREATE TABLE Filme (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Titulo VARCHAR(255) NOT NULL,
    Sinopse TEXT,
    AnoLancamento INT,
    PosterUrl VARCHAR(500),
    FraseEfeito VARCHAR(255),
    Status BIT
);

CREATE TABLE Mood (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Nome VARCHAR(100) NOT NULL,
    Descricao TEXT,
    IconeUrl VARCHAR(255),
    Status BIT
);

CREATE TABLE Pessoa (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Nome VARCHAR(150) NOT NULL,
    Biografia TEXT,
    FotoUrl VARCHAR(255)
);

CREATE TABLE Filme_Mood (
    IDFilme INT,
    IDMood INT,
    PRIMARY KEY (IDFilme, IDMood),
    FOREIGN KEY (IDFilme) REFERENCES Filme(ID),
    FOREIGN KEY (IDMood) REFERENCES Mood(ID)
);

CREATE TABLE Filme_Pessoa (
    IDFilme INT,
    IDPessoa INT,
    Papel VARCHAR(50), -- ATOR ou DIRETOR
    Personagem VARCHAR(100),
    PRIMARY KEY (IDFilme, IDPessoa, Papel),
    FOREIGN KEY (IDFilme) REFERENCES Filme(ID),
    FOREIGN KEY (IDPessoa) REFERENCES Pessoa(ID)
);