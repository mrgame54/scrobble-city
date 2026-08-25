const express = require('express')
const router = express.Router()

//get username
router.post('/', (req, res) => {
    const { username } = req.body

    req.session.username = username

    console.log('New user: ', username)
    res.json({message: 'Welcome ' + username + '!'})
})

module.exports = router