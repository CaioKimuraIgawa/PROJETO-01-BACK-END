const Usuario = require("./classes/Usuario");
const Album = require("./classes/Album");
const Foto = require("./classes/Foto");
const Tag = require("./classes/Tag");
const Favorito = require("./classes/Favorito");

async function Testes() {
  console.log("\n--- INSERÇÃO ---\n");

  const usuario = new Usuario("Maria", "maria@email.com", "senha123");
  await usuario.criar();
  console.log(">>> ID do usuário:", usuario._id, "\n");

  const album = new Album("Viagem", "Viagem para o interior", usuario._id);
  await album.criar();
  console.log(">>> ID do álbum:", album._id, "\n");

  const foto = new Foto("Paisagem", "Foto da montanha", "https://imagem.com/foto.jpg", usuario._id, album._id);
  await foto.criar();
  console.log(">>> ID da foto:", foto._id, "\n");

  const tag = new Tag("natureza", foto._id);
  await tag.criar();
  console.log(">>> ID da tag:", tag._id, "\n");

  const favorito = new Favorito(usuario._id, foto._id);
  await favorito.criar();
  console.log(">>> ID do favorito:", favorito._id, "\n");

  console.log("\n--- BUSCA POR ID e 1 POR EMAIL ---\n");

  const usuarioPorId = await Usuario.buscarPorId(usuario._id);
  console.log(">>> Usuário por ID");
  console.log(usuarioPorId, "\n");

  const usuarioBuscado = await Usuario.buscarPorEmail("maria@email.com");
  console.log(">>> Usuário buscado por email:");
  console.log(usuarioBuscado, "\n");

  const albumPorId = await Album.buscarPorId(album._id);
  console.log(">>> Álbum por ID:");
  console.log(albumPorId, "\n");

  const fotoPorId = await Foto.buscarPorId(foto._id);
  console.log(">>> Foto por ID:");
  console.log(fotoPorId, "\n");

  const tagPorId = await Tag.buscarPorId(tag._id);
  console.log(">>> Tag por ID:");
  console.log(tagPorId, "\n");

  const favoritoPorId = await Favorito.buscarPorId(favorito._id);
  console.log(">>> Favorito por ID:");
  console.log(favoritoPorId, "\n");

  console.log("\n--- DELEÇÃO POR ID ---\n");

  await Favorito.deletarPorId(favorito._id);
  console.log(">>> Favorito deletado.\n");

  await Tag.deletarPorId(tag._id);
  console.log(">>> Tag deletada.\n");

  await Foto.deletarPorId(foto._id);
  console.log(">>> Foto deletada.\n");

  await Album.deletarPorId(album._id);
  console.log(">>> Álbum deletado.\n");

  await Usuario.deletarPorId(usuario._id);
  console.log(">>> Usuário deletado.\n");

  console.log("--- TESTES FINALIZADOS ---\n");


}

Testes();
