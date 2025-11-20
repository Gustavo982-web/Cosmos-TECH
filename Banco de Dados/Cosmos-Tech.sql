CREATE DATABASE cosmos;
use cosmos;

CREATE TABLE usuario
(id_usuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(45),
senha VARCHAR(45));

CREATE TABLE quiz (
    idQuiz INT PRIMARY KEY,
    nome VARCHAR(100)
);
insert into  quiz VALUES(
1,'Sistema Sistema solar'
);

insert into  quiz VALUES(
2,'Sistema Viagens espacias'
);

select * from usuario;

CREATE TABLE resposta (
    idResposta INT PRIMARY KEY AUTO_INCREMENT,
    totalCerto INT NOT NULL,
    totalErrado INT NOT NULL,
    dataRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkUsuario INT NOT NULL,
    fkQuiz INT NOT NULL,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (fkQuiz) REFERENCES quiz(idQuiz)
);
DESC usuario;

SELECT 
    CONCAT(
        'O usuário ', usuario.nome,
        ' realizou o quiz ', quiz.nome,
        '. Acertos: ', resposta.totalCerto,
        ', Erros: ', resposta.totalErrado,
        ' em ', resposta.dataRegistro
    ) AS historico
FROM resposta
JOIN usuario ON resposta.fkUsuario = usuario.id_usuario
JOIN quiz ON quiz.idQuiz = resposta.fkQuiz;


select concat('O úsuario ',usuario.nome, 'teve o total de ', SUM(totalcerto),' acertos No quiz E o total de error de ', SUm(totalErrado),' No quiz',quiz.nome) as totalCertos from resposta JOIN usuario on usuario.id_usuario=resposta.fkUsuario
JOIN quiz ON resposta.fkQuiz=idQuiz
GROUP BY usuario.nome,quiz.nome;

SELECT * FROM usuario;	