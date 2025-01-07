const express = require('express')
const cors = require('cors')
const cookiesParser = require('cookie-parser')
const connectDB = require('./config/connectDB')
require('dotenv').config();
const router = require('./routes/index')
const { app, server } = require('./socket/index')


//const app = express()

app.use(cors({
    origin: "https://react-redux-chat-khaki.vercel.app",
    credentials: true
}))
app.use(express.json())
app.use(cookiesParser())

const PORT = process.env.PORT || 8080

app.get('/', (request, response) => {
    response.json({
        message: "Server running at " + PORT
    })
})

//api endpoints
app.use('/api', router)

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log("server running at " + PORT)
    })
})
