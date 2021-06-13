const Sequelize = require('sequelize')
const instancia = require('../../banco-de-dados')
const colunas = {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    link: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imagem: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    }
}
const opcoes ={
    freezeTableName: true,
    tableName: 'midias',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao'
}

module.exports = instancia.define('midias', colunas, opcoes);