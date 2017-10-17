const express = require('express');
const router  = express.Router();
const multer    = require('multer');
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const upload = multer({ dest: 'public/uploads/' });
const RequestJob = require('../models/requestJob')

router.get('/job/new', ensureLoggedIn(), (req, res) => {
    res.render('jobs/newjob');
});

router.post('/job/new', ensureLoggedIn(), upload.single('photo'), (req, res) => {

    const job = new RequestJob ({
      name: req.body.name,
      pic_path: `/uploads/${req.file.filename}`,
      pic_name: req.file.originalname
    })
    job.save((err) => {

        res.redirect('/');
    });

});

module.exports = router;
