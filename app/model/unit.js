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
<<<<<<< HEAD
SequelizeSlugify.slugifyModel(Unit, { source: ['name'] });
// Unit.sync({ force: true })

module.exports = Unit;
=======
 Unit.sync({ force: true })
SequelizeSlugify.slugifyModel(Unit, { source: ['name'] });
module.exports = Unit;
>>>>>>> 9e477b7d9b1bc77ff63b55ae3ecefdd709e3f550
