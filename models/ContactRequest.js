const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContactRequest = sequelize.define('ContactRequest', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eventDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    eventLocation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numberOfGuests: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    budget: {
        type: DataTypes.DECIMAL(10, 2)
    },
    eventType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    specialRequests: {
        type: DataTypes.TEXT
    },
    startTime: {
        type: DataTypes.TIME
    },
    endTime: {
        type: DataTypes.TIME
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
        defaultValue: 'pending'
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = ContactRequest;