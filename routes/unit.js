const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const checkUSer = require('../app/middlewarses/checkUserMiddlewarse')
const Unit = require('../app/model/unit')
const Vocabulary = require('../app/model/vocabulary')


router.get('/getunits', async (req, res) => {
    const units = await Unit.findAll();
    res.status(200).json({ units })
})
router.get('/checknameunit', async (req, res) => {
    let name = req.query.name
    if (name) {
        const unit = await Unit.findOne({ where: { name: req.query.name } })
        let exist = false
        if (unit) {
            exist = true
        }
        res.status(200).json({ exist })
        return
    }
    res.status(404)

})

router.put('/create', async (req, res) => {
    const { vocabularies, unitName, UnitDescriptoin } = req.body
    const unitCheck = await Unit.findOne({ where: { name: unitName } })
    if (unitCheck) {
        res.status(300).json({ status: false })
        return
    }
    const unit = await Unit.create({
        name: unitName,
        backgroudImage: 'EnglishIT1.jpg',
        description: UnitDescriptoin,
        subscriber: 0
    })
    var vocabulariesInsert = vocabularies.map((e => {
        return {
            english: e.english,
            vietnamese: e.vietnamese,
            spelling: e.spelling,
            unit_id: unit.id,
            typeVocabulary_id: e.typeVocabulary_id
        }
    }))
    let insertResult = Vocabulary.bulkCreate(vocabulariesInsert)

    res.status(200).json({ status: true })
})

router.put('/update', async (req, res) => {

    const { vocabularies, unitName, UnitDescriptoin } = req.body
    const unitCheck = await Unit.findOne({ where: { name: unitName } })
    if (unitCheck) {
        res.status(300).json({ status: false })
        return
    }
    const unit = await Unit.create({
        name: unitName,
        backgroudImage: 'EnglishIT1.jpg',
        description: UnitDescriptoin,
        subscriber: 0
    })
    var vocabulariesInsert = vocabularies.map((e => {
        return {
            english: e.english,
            vietnamese: e.vietnamese,
            spelling: e.spelling,
            unit_id: unit.id,
            typeVocabulary_id: e.typeVocabulary_id
        }
    }))
    let insertResult = Vocabulary.bulkCreate(vocabulariesInsert)

    res.status(200).json({ status: true })
})
module.exports = router;