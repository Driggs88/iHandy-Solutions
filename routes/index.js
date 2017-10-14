var express = require('express');
var router = express.Router();
var Picture     = require('../models/pictures');

router.get('/', function(req, res, next) {
  Picture.find((err, pictures) => {
    res.render('index', {pictures})
  })
});

module.exports = router;
