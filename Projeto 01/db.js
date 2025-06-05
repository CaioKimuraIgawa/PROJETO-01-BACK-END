const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
//const url = "mongodb://127.0.0.1:27017";
const dbName = "biblioteca_fotos";
let db = null;

async function getDb() {
  if (db) return db;

  try {
    const client = new MongoClient(url);
    await client.connect();
    db = client.db(dbName);
    console.log("🟢 MongoDB Conectado\n\n");
    return db;
  } catch (erro) {
    console.error("🔴 Erro ao conectar no MongoDB:", erro.message);
    throw erro;
  }
}

module.exports = { getDb };