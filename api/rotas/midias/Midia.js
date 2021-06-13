const CampoInvalido = require("../../erros/CampoInvalido");
const DadosNaoFornecidos = require("../../erros/DadosNaoFornecidos");
const TabelaMidia = require("./TabelaMidia");

class Midia {
  constructor({
    id,
    nome,
    link,
    descricao,
    imagem,
    tipo,
    dataCriacao,
    dataAtualizacao,
  }) {
    this.id = id;
    this.nome = nome;
    this.link = link;
    this.descricao = descricao;
    this.imagem = imagem;
    this.tipo = tipo;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
  }

  async criar() {
    this.validar();
    const resultado = await TabelaMidia.inserir({
      nome: this.nome,
      link: this.link,
      descricao: this.descricao,
      imagem: this.imagem,
      tipo: this.tipo,
    });
    this.id = resultado.id;
    this.dataCriacao = resultado.dataCriacao;
    this.dataAtualizacao = resultado.dataAtualizacao;
  }

  async carregar() {
    const encontrado = await TabelaMidia.pegarPorId(this.id);
    this.nome = encontrado.nome;
    this.link = encontrado.link;
    this.descricao = encontrado.descricao;
    this.imagem = encontrado.imagem;
    this.tipo = encontrado.tipo;
    this.dataCriacao = encontrado.dataCriacao;
    this.dataAtualizacao = encontrado.dataAtualizacao;
  }

  async atualizar() {
    await TabelaMidia.pegarPorId(this.id);
    const campos = [
      "nome",
      "link",
      "descricao",
      "imagem",
      "tipo",
    ];
    const dadosParaAtualizar = {};

    campos.forEach((campo) => {
      const valor = this[campo];

      if (typeof valor === 'string' && valor.length > 0 &&valor !== undefined) {
        dadosParaAtualizar[campo] = valor;
      }
    });

    if (Object.keys(dadosParaAtualizar).length === 0) {
      throw new DadosNaoFornecidos();
    }

    await TabelaMidia.atualizar(this.id, dadosParaAtualizar);
  }

  remover(){
    return TabelaMidia.remover(this.id);
  }
  validar(){
    const campos = ['nome', 'link', 'descricao', 'imagem', 'tipo']
    campos.forEach((campo)=>{
      const valor = this[campo]
      if (typeof valor !== 'string' && valor === undefined){
        throw new CampoInvalido(campo)
      }
    })
  }

}

module.exports = Midia;
