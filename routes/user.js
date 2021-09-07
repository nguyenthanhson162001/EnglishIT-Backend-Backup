const express = require('express');
const router = express.Router();
const User = require('../app/model/user')
const jwt = require('jsonwebtoken')
const checkJwt = require('../app/middlewarses/auth0Middlewares')
const checkUSer = require('../app/middlewarses/checkUserMiddlewarse')
const Unit = require('../app/model/unit')
const TypeVocabulary = require('..//app/model/typeVocabulary')
const vocabulary = require('../app/model/vocabulary')
const process = require('../app/model/process')
const exam = require('../app/model/exam')

router.get('/getinfo', (req, res) => {
    res.send('getuserInfo')
})
module.exports = router;