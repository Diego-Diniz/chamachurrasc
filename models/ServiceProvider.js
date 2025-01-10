const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajuste o caminho conforme sua estrutura
const User = require('./User'); // Importa o modelo de usuários para estabelecer a relação

const ServiceProvider = sequelize.define('ServiceProvider', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'Users', // Nome da tabela de referência
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    location: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    specialty: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    availableDates: {
        type: DataTypes.TEXT, // Usado para armazenar uma lista de datas disponíveis
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'ServiceProviders', // Nome da tabela no banco de dados
    timestamps: false, // Desativa o comportamento padrão do Sequelize para timestamps
});

// Estabelece o relacionamento com a tabela Users
ServiceProvider.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});

module.exports = ServiceProvider;