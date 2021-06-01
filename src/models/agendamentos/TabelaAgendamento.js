const sequelize = require('sequelize');
const instanciaDB = require('../../DB');

const columns = {
    nome_cliente: {
        type: sequelize.STRING,
        allowNull: false
    },
    nome_servico: {
        type: sequelize.STRING,
        allowNull: false
    },
    status: {
        type: sequelize.ENUM('agendado', 'cancelado'),
        allowNull: false
    },
    data_agendamento: {
        type: sequelize.DATE,
        allowNull: false
    }
};

const sequelizeOptions = {
    freezeTableName: true,
    tableName: 'agendamento',
    timestamps: true,
    createdAt: 'data_criacao',
    updatedAt: 'data_atualizacao'
};

module.exports = instanciaDB.define('agendamentos', columns, sequelizeOptions);