const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(__dirname, "erros.log");

function logErro(classeMetodo, erro) {
  const dataHora = new Date().toISOString();
  const mensagem = `[${dataHora}] [${classeMetodo}] ${erro.message}\n`;
  fs.appendFile(LOG_FILE, mensagem, (err) => {
    if (err) {
      console.error(":x: Falha ao gravar no log:", err.message);
    }
  });
}

module.exports = { logErro };