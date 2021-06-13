const ValorNaoSuportado = require("./erros/ValorNaoSuportado");

class Serializador {
  json(dados) {
    return JSON.stringify(dados);
  }

  serializar(dados) {
    if (this.contentType === "application/json") {
      return this.json(this.filtrarObjeto(dados));
    }

    throw new ValorNaoSuportado(this.contentType);
  }

  filtrarObjeto(dados){
      const novoObjeto = {}

      this.camposPublicos.forEach((campo)=>{
          if (dados.hasOwnProperty(campo)) {
              novoObjeto[campo] = dados[campo]
          }
      })
      return novoObjeto
  }
}
class SerializadorPaciente extends Serializador {
  constructor(contentType) {
    super();
    this.contentType = contentType;
    this.camposPublicos = ['id', 'nome', 'telefone1', 'midiaId']
  }
}
class SerializadorMidia extends Serializador {
  constructor(contentType) {
    super();
    this.contentType = contentType;
  }
}
module.exports = {
  Serializador: Serializador,
  SerializadorPaciente: SerializadorPaciente,
  SerializadorMidia: SerializadorMidia,
  formatosAceitos: ["application/json"],
};
