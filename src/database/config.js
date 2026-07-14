var mysql = require("mysql2/promise");

var pool = null;
var dbConectado = false;

var mySqlConfig = {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// SSL configuration for RDS (production)
if (process.env.NODE_ENV === "production") {
  mySqlConfig.ssl = {
    rejectUnauthorized: true,
  };
}

// Tenta criar o pool - se falhar, app continua rodando sem banco
try {
  pool = mysql.createPool(mySqlConfig);
} catch (err) {
  console.warn("[Database] Não foi possível criar o pool:", err.message);
}

// Test connection on startup (não bloqueia a app)
async function testConnection() {
  if (!pool) {
    console.warn("[Database] Pool não disponível. App rodando SEM banco de dados.");
    return;
  }

  try {
    var connection = await pool.getConnection();
    console.log("[Database] Conexão estabelecida com sucesso.");
    dbConectado = true;
    connection.release();
  } catch (err) {
    console.warn(`[Database] Não conectou: ${err.message}`);
    console.warn("[Database] App rodando SEM banco. Funcionalidades que usam banco não vão funcionar.");
  }
}

testConnection();

function executar(instrucao) {
  if (!pool) {
    return Promise.reject({ message: "Banco de dados não disponível. Configure a conexão no .env.dev" });
  }
  return pool.query(instrucao).then(function (resultado) {
    var resultados = resultado[0];
    console.log(resultados);
    return resultados;
  });
}

module.exports = {
  executar,
  pool,
};
