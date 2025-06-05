const { getDb } = require("../db");
const { ObjectId } = require("mongodb");
const { logErro } = require("../logger");

class Favorito {
  constructor(usuario_id, foto_id) {
    this.usuario_id = usuario_id;
    this.foto_id = foto_id;
    this.data_favorito = new Date();
  }
  //Funções
  async criar() {
    if (!this.usuario_id || !this.foto_id) {
      const msg = "Campos obrigatórios ausentes.";
      console.error("🔴 [Favorito.criar]", msg);
      logErro("Favorito.criar", new Error(msg));
      return;
    }

    try {
      const db = await getDb();
      const result = await db.collection("favoritos").insertOne({
        usuario_id: this.usuario_id,
        foto_id: this.foto_id,
        data_favorito: this.data_favorito
      });


      this._id = result.insertedId;
      console.log("🟢 [Favorito.criar] ID:", this._id);


    } catch (erro) {
      console.error("🔴 [Favorito.criar] Erro:", erro.message);
      logErro("Favorito.criar", erro);
    }
  }

  static async buscarPorId(id) {
    try {
      const db = await getDb();
      return await db.collection("favoritos").findOne({ _id: new ObjectId(id) });
    } catch (erro) {
      console.error("🔴 [Favorito.buscarPorId] Erro:", erro.message);
      logErro("Favorito.buscarPorId", erro);
    }
  }

  static async deletarPorId(id) {
    try {
      const db = await getDb();
      return await db.collection("favoritos").deleteOne({ _id: new ObjectId(id) });
    } catch (erro) {
      console.error("🔴 [Favorito.deletarPorId] Erro:", erro.message);
      logErro("Favorito.deletarPorId", erro);
    }
  }



  static async buscarPorUsuario(usuario_id) {
    try {
      const db = await getDb();
      const favoritos = await db.collection("favoritos").find({ usuario_id }).toArray();
      console.log(":mag: [Favorito.buscarPorUsuario] Favoritos encontrados:", favoritos);
      return favoritos;
    } catch (erro) {
      console.error(":x: [Favorito.buscarPorUsuario] Erro na busca:", erro.message);
    }
  }
}

module.exports = Favorito;



