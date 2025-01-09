const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajuste o caminho conforme sua estrutura

const User = sequelize.define('User', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    user_type: {
        type: DataTypes.ENUM('cliente', 'prestador'),
        allowNull: false,
        defaultValue: 'cliente',
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
    },
    zip_code: {
        type: DataTypes.STRING(15),
        allowNull: true,
    },
    profile_picture: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    rating: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false,
        defaultValue: 0.0,
    },
    reset_token: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    reset_token_expiry: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    confirmation_code: {
        type: DataTypes.STRING(6),  // Código de 6 dígitos, por exemplo
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    isActive: {
        type: DataTypes.ENUM('ativo', 'inativo'),
        allowNull: false,
        defaultValue: 'ativo',
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,  // Usuário começa como não confirmado
    },
    
}, {
    tableName: 'Users', // Nome da tabela no banco de dados
    timestamps: false,  // Desativa as colunas automáticas createdAt e updatedAt do Sequelize
});

module.exports = User;