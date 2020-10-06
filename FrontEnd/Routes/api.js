const express = require('express');
var router = express.Router();
var path = require('path');

var absolutePath = path.join(__dirname, "../../");

//redirect to the home page
router.route('/home').get(function (reqst, resp, callback) {
    resp.sendFile(absolutePath + "/FrontEnd/src/html/home.html");
});

module.exports = router;