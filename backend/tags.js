const express = require('express')
const router = express.Router()
const API_KEY = process.env.LASTFM_API_KEY
//const USERNAME = req.session.username
const USERNAME = 'MrGame54'

//check for API Key
if (!API_KEY) {
    throw new Error('Missing Last.fm API Key')
}

//fetch tags from Last.fm
async function fetchUserTags(username) {
    let tags = []
    const limit = 1000

    console.log('Fetching all tags for ' + username)

    try {
        const url = 'http://ws.audioscrobbler.com/2.0/?method=user.gettoptags&user=' + username + '&api_key=' + API_KEY + '&limit=' + limit + '&format=json'
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('HTTP error: ' + response.status)
        }

        const data = await response.json()

        if (data.error) {
            throw new Error('Last.fm API Error: ' + data.message)
        }

        tags = data.toptags.tag
        
        console.log('Successfully fetched all ' + tags.length + ' tags)')
        return tags

    } catch (error) {
        console.error('Failed to fetch tags: ', error)
        return []
    }
}

//request all tags
router.get('/', async (req, res) => {
    try {
        const fetchedTags = await fetchUserTags(USERNAME)
        res.json(fetchedTags)
    } catch (error) {
        console.error('Failed to fetch from Last.fm: ' + error)
        res.status(500).json({ error: 'Failed to fetch tags' })
    }
})

module.exports = router