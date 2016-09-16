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
