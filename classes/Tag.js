const { getDb } = require("../db");
const { ObjectId } = require("mongodb");
const { logErro } = require("../logger");

class Tag {
  constructor(nome, foto_id) {
    this.nome = nome;
    this.foto_id = foto_id;
  }
  //Funções
  async criar() {
    if (!this.nome || !this.foto_id) {
      const msg = "Campos obrigatórios ausentes.";
      console.error("🔴 [Tag.criar]", msg);
      logErro("Tag.criar", new Error(msg));
      return;
    }

    try {
      const db = await getDb();
      const result = await db.collection("tags").insertOne({
        nome: this.nome,
        foto_id: this.foto_id
      });


      this._id = result.insertedId;
      console.log("🟢 [Tag.criar] ID:", this._id);


    } catch (erro) {
      console.error("🔴 [Tag.criar] Erro:", erro.message);
      logErro("Tag.criar", erro);
    }
  }

  static async buscarPorId(id) {
    try {
      const db = await getDb();
      return await db.collection("tags").findOne({ _id: new ObjectId(id) });
    } catch (erro) {
      console.error("🔴 [Tag.buscarPorId] Erro:", erro.message);
      logErro("Tag.buscarPorId", erro);
    }
  }

  static async deletarPorId(id) {
    try {
      const db = await getDb();
      return await db.collection("tags").deleteOne({ _id: new ObjectId(id) });
    } catch (erro) {
      console.error("🔴 [Tag.deletarPorId] Erro:", erro.message);
      logErro("Tag.deletarPorId", erro);
    }
  }



  static async buscarPorNome(nome) {
    try {
      const db = await getDb();
      const tags = await db.collection("tags").find({ nome }).toArray();
      console.log(":mag: [Tag.buscarPorNome] Tags encontradas:", tags);
      return tags;
    } catch (erro) {
      console.error(":x: [Tag.buscarPorNome] Erro na busca:", erro.message);
    }
  }
}

module.exports = Tag;



