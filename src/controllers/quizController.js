var quizModel = require("../models/quizModel");

function salvar(req, res) {
    var certas = req.body.certas;
    var erradas = req.body.erradas;
    var fkUsuario = req.body.fkUsuario;
    var fkQuiz = req.body.fkQuiz;


    quizModel.salvar(certas, erradas, fkUsuario,fkQuiz)
        .then(() => res.status(200).send("Salvo com sucesso"))
        .catch((erro) => {
            console.log("Erro ao salvar:", erro);
            res.status(500).json(erro);
        });
}
function buscarResultados(req, res) {
    var idUsuario = req.params.idUsuario;

    quizModel.buscarResultados(idUsuario)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch((erro) => {
            console.log("Erro ao buscar resultados:", erro);
            res.status(500).json(erro);
        });
    }

module.exports = {
    salvar,
    buscarResultados
};