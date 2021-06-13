const roteador = require("express").Router();
const TabelaFornecedor = require("./TabelaPaciente");
const Paciente = require("./Paciente");
const SerializadorPaciente = require("../../Serializador").SerializadorPaciente

roteador.get("/", async (req, res) => {
  const resultados = await TabelaFornecedor.listar();

  res.status(200);
  const serializador = new SerializadorPaciente(
    res.getHeader("Content-Type")
    );

  res.send(
    serializador.serializar(resultados)
  );
});

roteador.post("/", async (req, res, proximo) => {
  try {
    const dadosRecebidos = req.body;
    const paciente = new Paciente(dadosRecebidos);
    await paciente.criar();
    res.status(201);
    const serializador = new SerializadorPaciente(
      res.getHeader("Content-Type")
    );
    res.send(serializador.serializar(paciente));
  } catch (erro) {
    proximo(erro);
  }
});

roteador.get("/:idPaciente", async (req, res, proximo) => {
  try {
    const id = req.params.idPaciente;
    const paciente = new Paciente({ id: id });
    await paciente.carregar();
    res.status(200);

    const serializador = new SerializadorPaciente(
      res.getHeader("Content-Type")
    );
    
    res.send(serializador.serializar(paciente));
  } catch (erro) {
    proximo(erro);
  }
});

roteador.put("/:idPaciente", async (req, res, proximo) => {
  try {
    const id = req.params.idPaciente;
    const dadosRecebidos = req.body;
    const dados = Object.assign({}, dadosRecebidos, { id: id });
    const paciente = new Paciente(dados);
    await paciente.atualizar();
    res.status(204);
    res.end();
  } catch (erro) {
    proximo(erro);
  }
});

roteador.delete("/:idPaciente", async (req, res, proximo) => {
  try {
    const id = req.params.idPaciente;
    const paciente = new Paciente({ id: id });
    await paciente.carregar();
    await paciente.remover();
    res.status(204);
    res.end();
  } catch (erro) {
    proximo(erro);
  }
});

module.exports = roteador;
