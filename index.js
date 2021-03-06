const express = require('express');
const app = express();
require('dotenv').config()
var morgan = require('morgan') // show log
const routes = require('./routes');
const cors = require('cors')
const port = 3004;
var os = require("os");

const { auth, requiresAuth } = require("express-openid-connect");
const got = require("got");
const Vocabulary = require('./app/model/vocabulary')
require('./config/mysql')
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencode
const server = require('./config/socket/exam')(app)
app.use(morgan('combined'))


// https congfig
const https = require('https')
const fs = require('fs')
const path = require('path')

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
}, app)


var corsOptions = {
    origin: process.env.URL_CLIENT,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

app.use(express.static('public'));

routes(app)

// server.listen(port, () => console.log(`server run with http://localhost:${port}`));
sslServer.listen(port, () => console.log(`server run with https://${os.hostname()}:${port}`));


// const xlsxFile = require('read-excel-file/node');

// xlsxFile('./unti1_unit2.xlsx').then((rows) => {
//     rows.map((row) => {

//         Vocabulary.create({
//             english: row[0],
//             vietnamese: row[1],
//             spelling: row[2],
//             unit_id: row[3],
//             typeVocabulary_id: row[4]
//         })
//     })
// })