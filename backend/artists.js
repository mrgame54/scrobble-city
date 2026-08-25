const express = require('express')
const router = express.Router()
const API_KEY = process.env.LASTFM_API_KEY
const USERNAME = req.session.username

//check for API Key
if (!API_KEY) {
    throw new Error('Missing Last.fm API Key')
}

//fetch artists from Last.fm
async function fetchUserArtists(username) {
    let artists = []
    let currentPage = 1
    let totalPages = 1
    const limit = 1000

    console.json('fetching all artists for ' + username)

    try {
        while (currentPage <= totalPages) {
            const url = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=' + username + '&api_key=' + API_KEY + '&limit=' + limit + '&page=' + currentPage + '&format=json' 
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error('HTTP error: ' + response.status)
            }

            const data = await response.json()

            if (data.error) {
                throw new Error('Last.fm API Error: ' + data.message)
            }

            const currentArtists = data.topartists.artist
            artists = artists.concat(currentArtists)

            const attributes = data.topartists['@attr'] //todo 
            totalPages = parseInt(attributes.totalPages, 10)

            console.log('Fetched page ' + currentPage + ' of ' + totalPages + '(' + currentArtists.length + ' artists)')

            currentPage++
            await new Promise(resolve => setTimeout(resolve, 200))
        }

        console.log('Successfully fetched all artists')
        return artists

    } catch (error) {
        console.error('Failed to fetch artists: ', error)
        return []
    }
}

//request all artists
router.get('/', (req, res) => {
    res.json[fetchUserArtists(USERNAME)]
})

module.exports = router