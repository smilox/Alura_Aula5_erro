const Sequelize = require('sequelize')
const instancia = require('../../banco-de-dados')
const colunas = {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataNascimento:{
        type: Sequelize.DATEONLY,
        //allowNull: false
    },
    cpf:{
        type: Sequelize.STRING,
        //allowNull: false
    },
    rg:{
        type: Sequelize.STRING,
        //allowNull: false
    },
    profissao:{
        type: Sequelize.STRING,
        //allowNull: false
    },
    cep:{
        type: Sequelize.STRING,
        //allowNull: false
    },
    endereco:{
        type: Sequelize.STRING,
        //allowNull: false
    },
    numero:{
        type: Sequelize.STRING,
        //allowNull: false
    },
    complemento:{
        type: Sequelize.STRING,
        //allowNull: false
    },
    bairro:{
        type: Sequelize.STRING,
        //allowNull: false
    },   
    cidade:{
        type: Sequelize.STRING,
        //allowNull: false
    },
    uf:{
        type: Sequelize.STRING,
        //allowNull: false
    },
    telefone1:{
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone2:{
        type: Sequelize.STRING,
        //allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        //allowNull: false
    },
    referencia:{
        type: Sequelize.STRING,
        //allowNull: false
    },
    obs:{
        type: Sequelize.STRING,
        //allowNull: false
    },
    midiaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
}
const opcoes ={
    freezeTableName: true,
    tableName: 'pacientes',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao'
}

module.exports = instancia.define('pacientes', colunas, opcoes);