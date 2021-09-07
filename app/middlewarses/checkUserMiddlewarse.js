const jwt = require('jsonwebtoken')
const axios = require('axios');
const User = require('../model/user')
module.exports = function(req, res, next) {
    var Authorization = req.headers.authorization + 1
    if (!Authorization) {
        res.status(401).json({ message: 'Require logger' })
    }
    console.log('---')
    axios.get('https://sowndev.us.auth0.com/userinfo', {
            headers: {
                Authorization: req.headers.authorization
            }
        })
        .then(async function(response) {

            const [user, created] = await User.findOrCreate({
                where: { codeSupplied: response.data.sub.split('|')[1] },
                defaults: {
                    provide: response.data.sub.split('|')[0],
                    lastName: response.data.family_name || '',
                    avatarURL: response.data.picture,
                    firstName: response.data.given_name || '',
                    email: response.data.email
                }
            });
            req.userID = user.id;
            next()
            if (created) {
                console.log('tao moi user');
            }
        })
        .catch(function(error) {
            console.log("checkUSer" + error);
        })

}