const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const route = require('./routes/route')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/public', express.static('public'))
app.use('/swiper', express.static('swiper'))
app.use('/api', route)

mongoose.connect('mongodb+srv://nguyenthanhan:0201172001An@cluster0.uye3kvn.mongodb.net/?retryWrites=true&w=majority').catch(error => console.log(error));
const database = mongoose.connection
if(!database) {
    console.log("Error connecting MongoDB")
}else{
    console.log("MongoDB connected successfully!")
}

app.get('/', function(req, res) {
    res.send("We are on home")
})

app.listen(process.env.PORT || 9000)