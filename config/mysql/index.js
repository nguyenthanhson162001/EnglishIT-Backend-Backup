const Sequelize = require('sequelize');
const sequelize = new Sequelize('english_it', 'root', 'Son@162001', {
    host: '18.139.222.164',
    dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
})
sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = {
    getSequlize: function () {
        return sequelize
    }
}