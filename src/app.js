const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20")
//const bcrypt = require("bcrypt")
const keys = require("../config/keys")
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









// google oauth
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        console.log("acess token: ", accessToken)
        console.log("refresh token:", refreshToken)
        console.log("profile: ", profile)
        console.log("done: ", cb)
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));


app.get("/auth/google", passport.authenticate("google", {
    scope: ['profile', 'email']
}))


app.get("/auth/google/callback", passport.authenticate("google", {
    scope: ['profile', 'email']
}))




//facebook oauth


app.get('', (req, res) => {
    res.render('index')
})





app.post("", (req, res) => {
    req.body.name
})





app.listen(port, () => {
    console.log("http://localhost:" + port)
})