var express = require('express');
var router = express.Router();

var React = require('react');
var ReactDOM = require('react-dom');
var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var secret_settings = require('../secret_settings.js')
var AUDITOR_USERNAME = secret_settings.AUDITOR_USERNAME
var AUDITOR_PASSWORD = secret_settings.AUDITOR_PASSWORD
var CLIENT_ID = secret_settings.CLIENT_ID
var CLIENT_SECRET = secret_settings.CLIENT_SECRET
var AUDITOR_URL = secret_settings.AUDITOR_URL

var request = require('request');

router.get('/', function(req, res, next) {
    // Calculate age of token.  If it's too old, the server won't authorize
    // it anymore, so we must request a new one
    var token_age = new Date(req.cookies['TOKEN_AGE'])
    var now = new Date()
    var diffMs = (now - token_age); // milliseconds
    var diffMins = ((diffMs % 86400000) % 3600000) / 60000; // minutes
    console.log("Token is " + diffMins + " mins old")

    if (diffMins >= 5) {
        console.log("COOKIE IS OLD, GRABBING NEW ONE B")

    }

    res.render("attendance")
});

router.get('/clearcookies', function(req, res, next) {
    res.cookie('AUTH_TOKEN', undefined).redirect('/cookies')
});

router.get('/cookies', function(req, res, next) {
    res.send("COOKIES: " + JSON.stringify(req.cookies))
});

// Requests a new auth token from the auditor server
router.get('/token/', function(req, res, next) {
    var token_cookie = req.cookies['AUTH_TOKEN']

    // Token cookie doesn't exist -> fetch new token and save it as cookie
    if (token_cookie == undefined || token_cookie == 'undefined') {
        console.log("Auth token not found.  Creating new one.")
        console.log(AUDITOR_URL)
        request({
            url: AUDITOR_URL + '/o/token/',
            method: 'POST',
            auth: {
                user: CLIENT_ID,
                pass: CLIENT_SECRET
            },
            form: {
                'grant_type': 'password',
                'username': AUDITOR_USERNAME,
                'password': AUDITOR_PASSWORD
            }
        }, function(err, result) {
            // parse out the new token
            var new_token = JSON.parse(result.body)['access_token']
            console.log(new_token)
            // set cookie to record last time we got a token
            res.cookie('TOKEN_AGE', new Date())

            // set AUTH_TOKEN cookie, and send it back as JSON
            res.cookie('AUTH_TOKEN', new_token).json(new_token)
        })
    }
    // else, token exists, send back the existing token
    else {
        console.log("Found Auth token")
        res.json(token_cookie)
    }
});

module.exports = router;
