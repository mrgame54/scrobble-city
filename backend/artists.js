const express = require('express')
const router = express.Router()
const API_KEY = process.env.LASTFM_API_KEY

if (!API_KEY) {
    throw new Error('Missing Last.fm API Key')
}

//request all artists
router.get('/', (req, res) => {
    const username = req.session.username

    res.send('This is the artists page')
})

module.exports = router