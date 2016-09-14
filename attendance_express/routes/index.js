var express = require('express');
var router = express.Router();

var React = require('react');
var ReactDOM = require('react-dom');
var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("HOME")
});

router.get('/members/', function(req, res, next) {
    res.render('members.jade')
})

module.exports = router;
