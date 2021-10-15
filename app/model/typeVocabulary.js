const { Sequelize, DataTypes, Model } = require('sequelize');
const vocabulary = require('./vocabulary')
const typeVocabulary = require('../../config/mysql/index').getSequlize().define('typeVocabulary', {
    // Model attributes are defined here
    NameEnglish: {
        type: DataTypes.STRING,
        allowNull: false
    },
    NameVietnamese: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Abbreviation: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false
});

 typeVocabulary.sync({ force: true })
module.exports = typeVocabulary;
