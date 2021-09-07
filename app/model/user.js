const { Sequelize, DataTypes, Model } = require('sequelize');
const User = require('../../config/mysql/index').getSequlize().define('User', {
    // Model attributes are defined here
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
    },
    firstName: {
        type: DataTypes.STRING
    },
    avatarURL: {
        type: DataTypes.STRING
    },
    codeSupplied: {
        type: DataTypes.STRING,
        allowNull: false
    },
    provide: {
        type: DataTypes.STRING
    }
}, {
    // Other model options go here
});
// User.sync({ force: true })
module.exports = User;