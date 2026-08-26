require('dotenv').config()
const cors = require('cors')
const express = require('express')
const session = require('express-session')
const tagsRouter = require('./tags')
const artistsRouter = require('./artists')
const tracksRouter = require('./tracks')
const app = express()
const API_KEY = process.env.LASTFM_API_KEY

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5000'
]

//whitelist
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

app.use(express.json())

//session setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false}
}))

//routers
app.use('/tags', tagsRouter)
app.use('/artists', artistsRouter)
app.use('/tracks', tracksRouter)

async function fetchUserInfo(username) {
    console.log('Fetching information for ' + username)

    try {
        const url = 'http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=' + username + '&api_key=' + API_KEY + '&format=json'
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('HTTP error: ' + response.status)
        }

        const data = await response.json()

        if (data.error) {
            throw new Error('Last.fm API Error: ' + data.message)
        }

        console.log('Successfully fetched all information)')

        return [data.user]

    } catch (error) {
        console.error('Failed to fetch info: ', error)
        return []
    }
}

//main page
app.get('/', (req, res) => {
    res.send('Welcome to Scrobble City')
})

//get username
app.post('/user', async (req, res) => {
    const username = req.body.username 
    req.session.username = username

    try {
        const fetchedInfo = await fetchUserInfo(username)
        res.json(fetchedInfo)
    } catch (error) {
        console.error('Failed to fetch from Last.fm: ' + error)
        res.status(500).json({ error: 'Failed to fetch user' })
    }
})

//start server
app.listen(5000, () => {
    console.log('Server is running on port 5000')
})