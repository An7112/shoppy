const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const dotenv = require('dotenv')


dotenv.config()
const app = express()
const PORT = process.env.PORT || 9000

const route = require('./routes/route')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/public', express.static('public'))
app.use('/swiper', express.static('swiper'))
app.use('/api', route)

mongoose.connect(process.env.DATABASE_URL).catch(error => console.log(error));
const database = mongoose.connection

if (!database) {
    console.log("Error connecting MongoDB")
} else {
    console.log("MongoDB connected successfully!")
}

app.listen(PORT , () => {
    console.log("Backend is running" + PORT )
})