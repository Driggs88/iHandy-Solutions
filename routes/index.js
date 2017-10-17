var express = require('express');
var router = express.Router();
var Picture     = require('../models/requestJob');

router.get('/', function(req, res, next) {
  Picture.find((err, requestJob) => {
    res.render('index', {requestJob})
  })
});

module.exports = router;
