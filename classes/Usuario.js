const { getDb } = require("../db");
const { ObjectId } = require("mongodb");
const { logErro } = require("../logger");

class Usuario {
  constructor(nome, email, senha) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.criado_em = new Date();
  }
  //Funções
  async criar() {
    if (!this.nome || !this.email || !this.senha) {
      const msg = "Campos obrigatórios ausentes.";
      console.error("🔴 [Usuario.criar]", msg);
      logErro("Usuario.criar", new Error(msg));
      return;
    }

    try {
      const db = await getDb();
      const result = await db.collection("usuarios").insertOne({
        nome: this.nome,
        email: this.email,
        senha: this.senha,
        criado_em: this.criado_em
      });


      this._id = result.insertedId;
      console.log("🟢 [Usuario.criar] ID:", this._id);


    } catch (erro) {
      console.error("🔴 [Usuario.criar] Erro:", erro.message);
      logErro("Usuario.criar", erro);
    }
  }





  static async buscarPorId(id) {
    try {
      const db = await getDb();
      return await db.collection("usuarios").findOne({ _id: new ObjectId(id) });
    } catch (erro) {
      console.error("🔴 [Usuario.buscarPorId] Erro:", erro.message);
      logErro("Usuario.buscarPorId", erro);
    }
  }

  static async deletarPorId(id) {
    try {
      const db = await getDb();
      return await db.collection("usuarios").deleteOne({ _id: new ObjectId(id) });
    } catch (erro) {
      console.error("🔴 [Usuario.deletarPorId] Erro:", erro.message);
      logErro("Usuario.deletarPorId", erro);
    }
  }

  static async buscarPorEmail(email) {
    try {
      const db = await getDb();
      const usuario = await db.collection("usuarios").findOne({ email });
      return usuario;
    } catch (erro) {
      console.error("🔴 [Usuario.buscarPorEmail] Erro ao buscar:", erro.message);
    }
  }
}

module.exports = Usuario;



