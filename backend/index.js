require('dotenv').config()
const cors = require('cors')
const express = require('express')
const session = require('express-session')
const tagsRouter = require('./tags')
const artistsRouter = require('./artists')
const tracksRouter = require('./tracks')
const app = express()

//whitelist
app.use(cors({
    origin: ['http://localhost:5173']
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

//main page
app.get('/', (req, res) => {
    res.send('Welcome to Scrobble City')
})

//get username
app.post('/user', (req, res) => {
    const username = req.bodyusername
    req.session.username = username
    res.send('Welcome!')
})

//start server
app.listen(5000, () => {
    console.log('Server is running on port 5000')
})