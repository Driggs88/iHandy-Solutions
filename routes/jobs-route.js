const express = require('express');
const router  = express.Router();
const TYPES    = require('../models/job-types');
const multer    = require('multer');
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const upload = multer({ dest: 'public/uploads/' });
const RequestJob = require('../models/requestJob')

router.get('/job/new', ensureLoggedIn(), (req, res) => {
    res.render('jobs/newjob', { types: TYPES });
});

router.post('/job/new', ensureLoggedIn(), upload.single('photo'), (req, res) => {

    const job = new RequestJob ({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      deadline: req.body.deadline,
      pic_path: `/uploads/${req.file.filename}`,
      pic_name: req.file.originalname,
      _creator: req.user._id,
    })
    job.save((err, newjob) => {
      if (err) {
        res.render('jobs/newjob', { requestJob: newjob, types: TYPES });
      } else {
        res.redirect(`/jobs/${newjob._id}`);
      }
    });

});

module.exports = router;
