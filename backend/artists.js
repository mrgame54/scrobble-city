const express = require('express')
const router = express.Router()

//request all artists
router.get('/', (req, res) => {
    res.send('This is the artists page')
})

module.exports = router