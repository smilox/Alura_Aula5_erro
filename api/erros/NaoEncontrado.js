class NaoEncontrado extends Error {
    constructor(pesquisado){
        const menssagem = `${pesquisado} não foi encontrado`
        super(menssagem)
        this.name = 'NaoEncontrado'
        this.idErro = 0
    }
}

module.exports = NaoEncontrado