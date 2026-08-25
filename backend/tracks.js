const express = require('express')
const router = express.Router()

//request all tracks
router.get('/', (req, res) => {
    res.json([
        {id: 1, name: 'natlus song', listened: 45, genre: 'jpop'},
        {id: 2, name: 'mrgame song', listened: 67, genre: 'bollywood'}
    ])
})

//request specific track by id
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)

    const tracks = [
        {id: 1, name: 'natlus song', listened: 45, genre: 'jpop'},
        {id: 2, name: 'mrgame song', listened: 67, genre: 'bollywood'}
    ]

    const requestedTrack = tracks.find((track) => track.id === id)
    res.json(requestedTrack)
})

module.exports = router