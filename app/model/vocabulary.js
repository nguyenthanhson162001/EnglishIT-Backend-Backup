const { Sequelize, DataTypes, Model } = require('sequelize');
const SequelizeSlugify = require('sequelize-slugify');
const Unit = require('..//model/unit');
const TypeVocabulary = require('..//model/typeVocabulary');
const Vocabulary = require('../../config/mysql/index').getSequlize().define('Vocabulary', {
    // Model attributes are defined here
    english: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vietnamese: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    spelling: {
        type: DataTypes.STRING,
    },
    unit_id: {
        type: DataTypes.INTEGER,
        references: {
            // This is a reference to another model
            model: Unit,
            // This is the column name of the referenced model
            key: 'id',
        }
    },
    typeVocabulary_id: {
        type: DataTypes.INTEGER,
        references: {
            // This is a reference to another model
            model: TypeVocabulary,
            // This is the column name of the referenced model
            key: 'id',
        }
    }
}, {
    timestamps: false

});

// Vocabulary.sync({ force: true })
module.exports = Vocabulary;