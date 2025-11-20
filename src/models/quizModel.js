var database = require("../database/config");

function salvar(certas, erradas, fkUsuario,fkQuiz) {
    var instrucao = `
        INSERT INTO resposta (totalCerto, totalErrado, fkUsuario,fkQuiz)
        VALUES (${certas}, ${erradas}, ${fkUsuario},${fkQuiz});
    `;

    console.log("Executando SQL:\n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    salvar
};