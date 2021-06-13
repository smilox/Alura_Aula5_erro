const Modelo = require("./ModeloTabelaPacientes");
const NaoEncontrado = require('../../erros/NaoEncontrado')

module.exports = {
  listar() {
    return Modelo.findAll();
  },
  inserir(paciente) {
    return Modelo.create(paciente);
  },

  async pegarPorId(id) {
    const encontrado = await Modelo.findOne({
      where: {
        id: id,
      },
    });
    if (!encontrado) {
      throw new NaoEncontrado('Paciente');
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
