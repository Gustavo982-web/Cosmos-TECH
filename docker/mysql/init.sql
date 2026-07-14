CREATE DATABASE IF NOT EXISTS cosmos;
USE cosmos;

CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(45)
);

CREATE TABLE IF NOT EXISTS quiz (
    idQuiz INT PRIMARY KEY,
    nome VARCHAR(100)
);

INSERT INTO quiz VALUES (1, 'Sistema Solar') ON DUPLICATE KEY UPDATE nome = VALUES(nome);
INSERT INTO quiz VALUES (2, 'Viagens Espaciais') ON DUPLICATE KEY UPDATE nome = VALUES(nome);

CREATE TABLE IF NOT EXISTS resposta (
    idResposta INT PRIMARY KEY AUTO_INCREMENT,
    totalCerto INT NOT NULL,
    totalErrado INT NOT NULL,
    dataRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkUsuario INT NOT NULL,
    fkQuiz INT NOT NULL,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (fkQuiz) REFERENCES quiz(idQuiz)
);
