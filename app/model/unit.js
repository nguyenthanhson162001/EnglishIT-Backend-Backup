const { Sequelize, DataTypes, Model } = require('sequelize');
const SequelizeSlugify = require('sequelize-slugify');
const Unit = require('..//..//config/mysql/index').getSequlize().define('Unit', {
    // Model attributes are defined here
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    backgroudImage: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    subscriber: {
        type: DataTypes.INTEGER
    },
    slug: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    // Other model options go here
});
 Unit.sync({ force: true })
SequelizeSlugify.slugifyModel(Unit, { source: ['name'] });
module.exports = Unit;
