const TabelaPaciente = require("./TabelaPaciente");
const CampoInvalido = require("../../erros/CampoInvalido");
const DadosNaoFornecidos = require("../../erros/DadosNaoFornecidos");

class Paciente {
  constructor({
    id,
    nome,
    dataNascimento,
    cpf,
    rg,
    profissao,
    cep,
    endereco,
    numero,
    complemento,
    bairro,
    cidade,
    uf,
    telefone1,
    telefone2,
    email,
    referencia,
    obs,
    midiaId,
    dataCriacao,
    dataAtualizacao,
  }) {
    this.id = id;
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.cpf = cpf;
    this.rg = rg;
    this.profissao = profissao;
    this.cep = cep;
    this.endereco = endereco;
    this.numero = numero;
    this.complemento = complemento;
    this.bairro = bairro;
    this.cidade = cidade;
    this.uf = uf;
    this.telefone1 = telefone1;
    this.telefone2 = telefone2;
    this.email = email;
    this.referencia = referencia;
    this.obs = obs;
    this.midiaId = midiaId;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
  }

  async criar() {
    this.validar();
    const resultado = await TabelaPaciente.inserir({
      nome: this.nome,
      dataNascimento: this.dataNascimento,
      cpf: this.cpf,
      rg: this.rg,
      profissao: this.profissao,
      cep: this.cep,
      endereco: this.endereco,
      numero: this.numero,
      complemento: this.complemento,
      bairro: this.bairro,
      cidade: this.cidade,
      uf: this.uf,
      telefone1: this.telefone1,
      telefone2: this.telefone2,
      email: this.email,
      referencia: this.referencia,
      obs: this.obs,
      midiaId: this.midiaId,
    });
    this.id = resultado.id;
    this.dataCriacao = resultado.dataCriacao;
    this.dataAtualizacao = resultado.dataAtualizacao;
  }

  async carregar() {
    const encontrado = await TabelaPaciente.pegarPorId(this.id);
    this.nome = encontrado.nome;
    this.dataNascimento = encontrado.dataNascimento;
    this.cpf = encontrado.cpf;
    this.rg = encontrado.rg;
    this.profissao = encontrado.profissao;
    this.cep = encontrado.cep;
    this.endereco = encontrado.endereco;
    this.numero = encontrado.numero;
    this.complemento = encontrado.complemento;
    this.bairro = encontrado.bairro;
    this.cidade = encontrado.cidade;
    this.uf = encontrado.uf;
    this.telefone1 = encontrado.telefone1;
    this.telefone2 = encontrado.telefone2;
    this.email = encontrado.email;
    this.referencia = encontrado.referencia;
    this.obs = encontrado.obs;
    this.midiaId = encontrado.midiaId;
    this.dataCriacao = encontrado.dataCriacao;
    this.dataAtualizacao = encontrado.dataAtualizacao;
  }

  async atualizar() {
    await TabelaPaciente.pegarPorId(this.id);
    const campos = [
      "nome",
      "dataNascimento",
      "cpf",
      "rg",
      "profissao",
      "cep",
      "endereco",
      "numero",
      "complemento",
      "bairro",
      "cidade",
      "uf",
      "telefone1",
      "telefone2",
      "email",
      "referencia",
      "obs",
      "midiaId",
    ];
    const dadosParaAtualizar = {};

    campos.forEach((campo) => {
      const valor = this[campo];

      if (valor !== undefined) {
        dadosParaAtualizar[campo] = valor;
      }
    });

    if (Object.keys(dadosParaAtualizar).length === 0) {
      throw new DadosNaoFornecidos();
    }

    await TabelaPaciente.atualizar(this.id, dadosParaAtualizar);
  }

  remover(){
    return TabelaPaciente.remover(this.id);
  }
  validar(){
    const campos = ['nome', 'telefone1', 'midiaId']
    campos.forEach((campo)=>{
      const valor = this[campo]
      if (valor === undefined){
        throw new CampoInvalido(campo)
      }
      if (campo === 'midiaId' && typeof valor !== 'number'){
        throw new CampoInvalido(campo)  
      }
    })
  }

}

module.exports = Paciente;
