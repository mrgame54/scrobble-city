const cors = require('cors')
const express = require('express')
const userRouter = require('./user')
const genresRouter = require('./genres')
const artistsRouter = require('./artists')
const tracksRouter = require('./tracks')
const app = express()

app.use(cors({
    origin: ['https://localhost:5000']
}))

app.use(express.json())

//routers
app.use('/user', userRouter)
app.use('/genres', genresRouter)
app.use('/artists', artistsRouter)
app.use('/tracks', tracksRouter)

//main page
app.get('/', (req, res) => {
    res.send('Welcome to Scrobble City')
})

//start server
app.listen(5000, () => {
    console.log('server is running')
})