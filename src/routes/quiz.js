var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");


// daqui vou para o controllers
router.post("/salvar", function (req, res) {
    quizController.salvar(req, res);
});

router.get("/resultados/:idUsuario", function (req, res) {
    quizController.buscarResultados(req, res);
});



module.exports = router;