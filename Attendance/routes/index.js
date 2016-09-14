var express = require('express');
var router = express.Router();

var React = require('react');
var ReactDOM = require('react-dom');
var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("attendance")
});

module.exports = router;