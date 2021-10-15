const express = require('express');
const router = express.Router();
const checkUSer = require('../app/middlewarses/checkUserMiddlewarse')

// const User = require('../app/model/user')
// const jwt = require('jsonwebtoken')
// const checkJwt = require('../app/middlewarses/auth0Middlewares')
// const Unit = require('../app/model/unit')
// const TypeVocabulary = require('..//app/model/typeVocabulary')
const vocabulary = require('../app/model/vocabulary')
    // const process = require('../app/model/process')
    // const exam = require('../app/model/exam')
    // '1', 'Verb', 'Động từ', 'v'
    // '2', 'Adverb', 'Trạng từ', 'adv'
    // '3', 'Adjective', 'Tính từ', 'adj'
    // '4', 'Nouns', 'Danh từ', 'n'
    // '5', 'Prepositions', 'Giới từ', 'pre'


router.get("/image/:image", (req, res) => {});
router.get("/external", checkUSer, (req, res) => {
    console.log(req.userID)
    console.log(process.env.AUTH0_DOMAIN)
    res.json({ message: "ahihi" })
});
router.get('/auth0/config', function(req, res) {
    // let url = req.protocol + '://' + req.get('host') + req.originalUrl
    let url = req.protocol + '://' + req.get('host');
    res.json({
        "domain": process.env.AUTH0_DOMAIN,
        "clientId": process.env.AUTH0_CLIENT_ID,
        "audience": url + '/api'
    })
})

module.exports = router;