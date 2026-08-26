require('dotenv').config()
const cors = require('cors')
const express = require('express')
const userRouter = require('./user')
const tagsRouter = require('./tags')
const artistsRouter = require('./artists')
const tracksRouter = require('./tracks')
const app = express()

//whitelist
app.use(cors({
    origin: ['https://localhost:5000']
}))

app.use(express.json())

//routers
app.use('/user', userRouter)
app.use('/tags', tagsRouter)
app.use('/artists', artistsRouter)
app.use('/tracks', tracksRouter)

//main page
app.get('/', (req, res) => {
    res.send('Welcome to Scrobble City')
})

//start server
app.listen(5000, () => {
    console.log('Server is running')
})