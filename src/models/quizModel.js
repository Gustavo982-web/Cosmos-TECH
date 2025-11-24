var database = require("../database/config");

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql


function salvar(certas, erradas, fkUsuario,fkQuiz) {

     // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO resposta (totalCerto, totalErrado, fkUsuario,fkQuiz)
        VALUES (${certas}, ${erradas}, ${fkUsuario},${fkQuiz});
    `;

    console.log("Executando SQL:\n" + instrucao);
    return database.executar(instrucao);
}

function buscarResultados(idUsuario){
var instrucao=`  SELECT 
            quiz.nome AS nomeQuiz,
            SUM(resposta.totalCerto) AS totalCerto,
            SUM(resposta.totalErrado) AS totalErrado
        FROM resposta
        JOIN quiz ON resposta.fkQuiz = quiz.idQuiz
        WHERE resposta.fkUsuario = ${idUsuario}
        GROUP BY quiz.nome;
    `;

console.log("Executando SQL:\n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    salvar,
    buscarResultados
};