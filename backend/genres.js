const express = require('express')
const router = express.Router()

//request all genres
router.get('/', (req, res) => {
    res.send('This is the genre page')
})

module.exports = router