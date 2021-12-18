const axios = require('axios');
const ExamControl = require('../../util/ExamControl')
const { Sequelize, Op } = require('sequelize');
const Exam = require('..//..//app/model/exam')
const { User, Unit, Process, Vocabulary, TypeVocabulary } = require('..//..//app/model')
    // const fetch = require('node-fetch');

function exam(app) {
    const server = require('http').createServer(app);
    const io = require('socket.io')(server, {
        cors: {
            origin: process.env.URL_CLIENT,
            methods: ["GET", "POST"]
        }
    });
    io.on('connection', (client) => {
        console.log('===> Start connection with clientID: ' + client.id);
        var examControl;
        let sumTotalQuestion = 0;
        client.on('start-client', async function(data) {
            const { authorization, unitSlug, processSlug } = data
            const [user, unit, process] = await Promise.all([
                getuserInfo(authorization),
                Unit.findOne({ where: { slug: unitSlug } }),
                Process.findOne({ where: { slug: processSlug } })
            ])



            if (!user || !unit || !process) {
                client.emit('error', {
                    message: 'user or unti or process incorrect'
                })
                return
            }
            examControl = new ExamControl(
                await Vocabulary.findAll({
                    where: { unit_id: unit.id },
                    include: { model: TypeVocabulary },
                }),
                unit.id,
                process.id,
                user.id)
            sumTotalQuestion = examControl.length()
            if (sumTotalQuestion == 0) {
                client.emit('error', {
                    message: 'Unit haven\'t vocabulary'
                })
            }
            // client show form exam
            client.emit('start-server', { unitName: unit.name, processName: process.name, sumTotalQuestion: sumTotalQuestion })
        });

        client.on('get-question', () => {
            sendQuestion()
        });
        client.on('check-answer', (answer) => {
            // console.log(answer)
            client.emit('server-result-check-answer', { result: examControl.isAnswer(answer) })
        });

        async function sendQuestion() {
            if (!examControl.isFinish()) {
                client.emit('server-send-question', await examControl.getQuestion())
            } else {
                client.emit('server-finish', examControl.getIncorrectVocabularies())
            }
        }
        client.on('disconnect', () => { console.log('!=!=> disconnect: ' + client.id) });
    });
    return server
}
module.exports = exam;
async function getuserInfo(Authorization) {
    if (!Authorization) {
        return undefined
    }
    var response = await axios.get('https://sowndev.us.auth0.com/userinfo', {
        headers: {
            Authorization: 'Bearer ' + Authorization
        }
    })
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
    return user;
}

function mixArray(array) {
    return array.sort(() => Math.random() - 0.5)
}
test()
async function test() {
    // var examControl = new ExamControl(
    //     await Vocabulary.findAll({
    //         where: { unit_id: 1 },
    //         include: { model: TypeVocabulary },
    //     }),
    //     1,
    //     1,
    //     1)
    // console.log(await examControl.getQuestion())


}