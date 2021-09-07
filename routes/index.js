const site = require('./site')
const unit = require('./unit')
const exam = require('./exam')

function router(app) {
    app.use('/api/unit', unit)
    app.use('/api/exam', exam)
    app.use('/api', site)
    app.get('/*', (req, res) => {
        res.send('Hello this is server EnglishIT' + req.a);
    })
}
module.exports = router;