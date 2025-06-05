const { getDb } = require("../db");
const { ObjectId } = require("mongodb");
const { logErro } = require("../logger");

class Foto {
  constructor(titulo, descricao, url, usuario_id, album_id) {
    this.titulo = titulo;
    this.descricao = descricao;
    this.url = url;
    this.usuario_id = usuario_id;
    this.album_id = album_id;
    this.data_upload = new Date();
  }
  //Funções
  async criar() {
    if (!this.titulo || !this.url || !this.usuario_id || !this.album_id) {
      const msg = "Campos obrigatórios ausentes.";
      console.error("🔴 [Foto.criar]", msg);
      logErro("Foto.criar", new Error(msg));
      return;
    }

    try {
      const db = await getDb();
      const result = await db.collection("fotos").insertOne({
        titulo: this.titulo,
        descricao: this.descricao,
        url: this.url,
        usuario_id: this.usuario_id,
        album_id: this.album_id,
        data_upload: this.data_upload
      });


      this._id = result.insertedId;
      console.log("🟢 [Foto.criar] ID:", this._id);


    } catch (erro) {
      console.error("🔴 [Foto.criar] Erro:", erro.message);
      logErro("Foto.criar", erro);
    }
  }

  static async buscarPorId(id) {
    try {
      const db = await getDb();
      return await db.collection("fotos").findOne({ _id: new ObjectId(id) });
    } catch (erro) {
      console.error("🔴 [Foto.buscarPorId] Erro:", erro.message);
      logErro("Foto.buscarPorId", erro);
    }
  }

  static async deletarPorId(id) {
    try {
      const db = await getDb();
      return await db.collection("fotos").deleteOne({ _id: new ObjectId(id) });
    } catch (erro) {
      console.error("❌ [Foto.deletarPorId] Erro:", erro.message);
      logErro("Foto.deletarPorId", erro);
    }
  }



  static async buscarPorAlbum(album_id) {
    try {
      const db = await getDb();
      const fotos = await db.collection("fotos").find({ album_id }).toArray();
      console.log(":mag: [Foto.buscarPorAlbum] Fotos encontradas:", fotos);
      return fotos;
    } catch (erro) {
      console.error(":x: [Foto.buscarPorAlbum] Erro na busca:", erro.message);
    }
  }
}

module.exports = Foto;




