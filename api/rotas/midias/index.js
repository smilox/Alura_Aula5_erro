const roteador = require("express").Router();
const TabelaMidia = require("./TabelaMidia");
const Midia = require("./Midia");
const SerializadorMidia = require('../../Serializador').SerializadorMidia

roteador.get("/", async (req, res) => {
  const resultados = await TabelaMidia.listar();
  res.status(200);
  const serializador = new SerializadorMidia(res.getHeader('Content-Type'))
  res.send(serializador.serializar(resultados));
});

roteador.post("/", async (req, res, proximo) => {
  try {
    const dadosRecebidos = req.body;
    const midia = new Midia(dadosRecebidos);
    await midia.criar();
    res.status(201);
    const serializador = new SerializadorMidia(res.getHeader('Content-Type'))
    res.send(serializador.serializar(midia));
  } catch (erro) {
    proximo(erro);
  }
});

roteador.get("/:idMidia", async (req, res, proximo) => {
  try {
    const id = req.params.idMidia;
    const midia = new Midia({ id: id });
    await midia.carregar();
    res.status(200);
    const serializador = new SerializadorMidia(res.getHeader('Content-Type'))
    res.send(serializador.serializar(midia));
  } catch (erro) {
    proximo(erro);
  }
});

roteador.put("/:idMidia", async (req, res,proximo) => {
  try {
    const id = req.params.idMidia;
    const dadosRecebidos = req.body;
    const dados = Object.assign({}, dadosRecebidos, { id: id });
    const midia = new Midia(dados);
    await midia.atualizar();
    res.status(204);
    res.end();
  } catch (erro) {
    proximo(erro)
  }
});

roteador.delete("/:idMidia", async (req, res,proximo) => {
  try {
    const id = req.params.idMidia;
    const midia = new Midia({ id: id });
    await midia.carregar();
    await midia.remover();
    res.status(204);
    res.end();
  } catch (erro) {
    proximo(erro)
  }
});

module.exports = roteador;
