const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const bcrypt = require("bcrypt")
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))

const user = []

// path declearation 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
    // Setup static directory to serve
app.use(express.static(publicDirectoryPath))





app.get('', (req, res) => {
    res.render('index')
})
app.get('/login', (req, res) => {
    res.render("login")
})
app.get('/register', (req, res) => {
    res.render('register')
})

app.post("", (req, res) => {

})




app.post("", (req, res) => {
    req.body.name
})





app.listen(port, () => {
    console.log("http://localhost:" + port)
})