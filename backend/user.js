const express = require('express')
const router = express.Router()

//user (with some testing lines)
router.post('/', (req, res) => {
    const {name} = req.body

    console.log('New user: ', name)
    res.json({message: 'Welcome ' + user + '!'})
})

module.exports = router