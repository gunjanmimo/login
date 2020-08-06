// ! required packages
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20")
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require("../config/keys")
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))



// ! path declearation 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))










// ! google auth and callback

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




// ! facebook oauth
// passport.use(new FacebookStrategy({
//     clientID: "1252574065074048",
//     clientSecret: "144a8861bbdfe41c9b12eeb40f6ba717",
//     callbackURL: "/auth/facebook/callback"
// },
//     function (accessToken, refreshToken, profile, done) {
//         process.nextTick(function () {
//             //Check whether the User exists or not using profile.id
//             if (config.use_database) {
//                 //Further code of Database.
//             }
//             return done(null, profile);
//         });
//     }

// ));
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});


// Use the FacebookStrategy within Passport.

passport.use(new FacebookStrategy({
    clientID: "1252574065074048",
    clientSecret: "144a8861bbdfe41c9b12eeb40f6ba717",
    callbackURL: "/auth/facebook/callback"
},
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            //Check whether the User exists or not using profile.id
            if (config.use_database) {
                // if sets to true
                pool.query("SELECT * from user_info where user_id=" + profile.id, (err, rows) => {
                    if (err) throw err;
                    if (rows && rows.length === 0) {
                        console.log("There is no such user, adding now");
                        pool.query("INSERT into user_info(user_id,user_name) VALUES('" + profile.id + "','" + profile.username + "')");
                    } else {
                        console.log("User already exists in database");
                    }
                });
            }
            return done(null, profile);
        });
    }
));

app.get('/account', ensureAuthenticated, function (req, res) {
    res.render('account', { user: req.user });
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));


app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}






// ! index page
app.get('', (req, res) => {
    res.render('index')
})




// ! app listener
app.listen(port, () => {
    console.log("http://localhost:" + port)
})