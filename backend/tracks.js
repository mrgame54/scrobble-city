const express = require('express')
const router = express.Router()
const API_KEY = process.env.LASTFM_API_KEY
//const USERNAME = req.session.username
const USERNAME = 'MrGame54'

//check for API Key
if (!API_KEY) {
    throw new Error('Missing Last.fm API Key')
}

//fetch tracks from Last.fm
async function fetchUserTracks(username) {
    let tracks = []
    let currentPage = 1
    let totalPages = 1
    const limit = 1000

    console.log('Fetching all tracks for ' + username)

    try {
        while (currentPage <= totalPages) {
            const url = 'http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=' + username + '&api_key=' + API_KEY + '&limit=' + limit + '&page=' + currentPage + '&format=json' 
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error('HTTP error: ' + response.status)
            }

            const data = await response.json()

            if (data.error) {
                throw new Error('Last.fm API Error: ' + data.message)
            }

            const currentTracks = data.toptracks.track
            tracks = tracks.concat(currentTracks)

            const attributes = data.toptracks['@attr'] 
            totalPages = parseInt(attributes.totalPages, 10)

            console.log('Fetched page ' + currentPage + ' of ' + totalPages + '(' + currentTracks.length + ' tracks)')

            currentPage++
            await new Promise(resolve => setTimeout(resolve, 200))
        }

        console.log('Successfully fetched all tracks')
        return tracks

    } catch (error) {
        console.error('Failed to fetch tracks: ', error)
        return []
    }
}

//request all tracks
router.get('/', async (req, res) => {
    try {
        const fetchedTracks = await fetchUserTracks(USERNAME)
        res.json(fetchedTracks)
    } catch (error) {
        console.error('Failed to fetch from Last.fm: ' + error)
        res.status(500).json({ error: 'Failed to fetch tracks' })
    }
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