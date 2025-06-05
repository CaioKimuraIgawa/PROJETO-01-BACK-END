const { getDb } = require("../db");
const { ObjectId } = require("mongodb");
const { logErro } = require("../logger");

class Album {
  constructor(nome, descricao, usuario_id) {
    this.nome = nome;
    this.descricao = descricao;
    this.usuario_id = usuario_id;
    this.data_criacao = new Date();
  }
  //Funções
  async criar() {
    if (!this.nome || !this.usuario_id) {
      const msg = "Campos obrigatórios ausentes.";
      console.error("🔴 [Album.criar]", msg);
      logErro("Album.criar", new Error(msg));
      return;
    }

    try {
      const db = await getDb();
      const result = await db.collection("albuns").insertOne({
        nome: this.nome,
        descricao: this.descricao,
        usuario_id: this.usuario_id,
        data_criacao: this.data_criacao
      });


      this._id = result.insertedId;
      console.log("🟢 [Album.criar] ID:", this._id);


    } catch (erro) {
      console.error("🔴 [Album.criar] Erro:", erro.message);
      logErro("Album.criar", erro);
    }
  }

  static async buscarPorId(id) {
    try {
      const db = await getDb();
      return await db.collection("albuns").findOne({ _id: new ObjectId(id) });
    } catch (erro) {
      console.error("🔴 [Album.buscarPorId] Erro:", erro.message);
      logErro("Album.buscarPorId", erro);
    }
  }

  static async deletarPorId(id) {
    try {
      const db = await getDb();
      return await db.collection("albuns").deleteOne({ _id: new ObjectId(id) });
    } catch (erro) {
      console.error("🔴 [Album.deletarPorId] Erro:", erro.message);
      logErro("Album.deletarPorId", erro);
    }
  }
}

module.exports = Album;
