const NaoEncontrado = require("../../erros/NaoEncontrado");
const Modelo = require("./ModeloTabelaMidias");

module.exports = {
  listar() {
    return Modelo.findAll();
  },
  inserir(midia) {
    return Modelo.create(midia);
  },

  async pegarPorId(id) {
    const encontrado = await Modelo.findOne({
      where: {
        id: id,
      },
    });
    if (!encontrado) {
      throw new NaoEncontrado('Midia');
    }

    return encontrado;
  },
  async atualizar(id, dadosParaAtualizar) {
    return Modelo.update(dadosParaAtualizar, { where: { id: id } });
  },
  async remover(id){
    return Modelo.destroy({
      where: {id:id}
    })
  }
};
