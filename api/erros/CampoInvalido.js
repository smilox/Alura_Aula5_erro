class CampoInvalido extends Error {
  constructor(campo) {
    const menssagem = `O Campo ${campo} está inválido`;
    super(menssagem);
    this.name = "CampoInvalido";
    this.idErro = 1;
  }
}

module.exports = CampoInvalido;
