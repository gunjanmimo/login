const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000




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
    res.send('index')
})



app.listen(port, () => {
    console.log("http://localhost:" + port)
})