require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env" : ".env.dev",
});

var express = require("express");
var cors = require("cors");
var path = require("path");

var app = express();

var PORTA_APP = process.env.APP_PORT || 3333;
var HOST_APP = process.env.APP_HOST || "0.0.0.0";

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Static files
app.use(express.static(path.join(__dirname, "Site", "app")));

// Routes
var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var quizRouter = require("./src/routes/quiz");

app.use("/", indexRouter);
app.use("/quiz", quizRouter);
app.use("/usuarios", usuarioRouter);

// Error handling middleware
app.use(function (err, req, res, next) {
  console.error(`[ERROR] ${err.message}`);
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === "production"
      ? "Erro interno do servidor"
      : err.message,
  });
});

// Start server
app.listen(PORTA_APP, HOST_APP, function () {
  console.log(`[Cosmos-TECH] Servidor rodando em http://${HOST_APP}:${PORTA_APP}`);
  console.log(`[Cosmos-TECH] Ambiente: ${process.env.NODE_ENV || "development"}`);
});
