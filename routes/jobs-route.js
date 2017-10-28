const express = require('express');
const router  = express.Router();
const TYPES    = require('../models/job-types');
const multer    = require('multer');
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const upload = multer({ dest: 'public/uploads/' });
const RequestJob = require('../models/requestJob');
const { authorizeJob, checkOwnership } = require('../middleware/job-authorization');


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
        // res.redirect(`/jobs/${newjob._id}`);
        res.redirect('/');
      }
    });
});

// routes to Edit jobs
router.get('/:id/edit', ensureLoggedIn('/login'),  (req, res, next) => {
  RequestJob.findById(req.params.id, (err, job) => {
    if (err)       { return next(err) }
    if (!job) { return next(new Error("404")) }
    return res.render('jobs/edit', { job, types: TYPES })
  });
});


// Find and Update record
router.post('/:id/edit', ensureLoggedIn('/login'), (req, res, next) => {
  const updates = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    deadline: req.body.deadline
  };

  RequestJob.findByIdAndUpdate(req.params.id, updates, (err, job) => {
    if (err) {
      return res.render('jobs/edit', {
        job,
        errors: job.errors
      });
    }
    if (!job) {
      return next(new Error('404'));
    }
    return res.redirect(`/`);
  });
});
router.post('/:id/delete', (req, res, next) => {
  RequestJob.findByIdAndRemove(req.params.id, (err, job) => {
    if (err) {
      return next(err);
    }
    return res.redirect('/');
  })
})

module.exports = router;
