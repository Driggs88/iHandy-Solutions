const express = require('express');
const router  = express.Router();
const multer    = require('multer');
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const upload = multer({ dest: 'public/uploads/' });
const Picture = require('../models/pictures')

router.get('/job/new', ensureLoggedIn(), (req, res) => {
    res.render('jobs/newjob');
});

router.post('/job/new', ensureLoggedIn(), upload.single('photo'), (req, res) => {
    const pic = new Picture ({
      name: req.body.name,
      pic_path: `/uploads/${req.file.filename}`,
      pic_name: req.body.picName
    })
    pic.save((err) => {
        res.redirect('/');
    });
});

module.exports = router;
