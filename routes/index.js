var express = require('express');
var router = express.Router();
var RequestJob     = require('../models/requestJob');

router.get('/', function(req, res, next) {

  // if (req.user) {
  //   RequestJob
  //   .findOne({_creator: req.user._id})
  //   .populate('_creator')
  //   .exec((err, requestJob) => {
  //     console.log('JOB CREATOR!!!!!!!',requestJob._creator)
  //     res.render('index', {requestJob});
  //   })
  // }

  if (req.user) {

    // if user is an Admin
  if (req.user.userRole === 'Admin') {
    RequestJob.find( {} )
    .populate('_creator')
    .exec( (err, requestJob) => {
      if (err) { return next(err); }

      console.log('CREATOR!!!!!~~~~', requestJob[0]._creator);
      res.render('index', {requestJob: requestJob});
    });
    return
  }

   // if user is a basic user
    RequestJob
    .find({_creator: req.user._id},
    (err, requestJob) => {
      // console.log('JOB CREATOR!!!!!!!',requestJob)
      res.render('index', {requestJob});
    });
  }

  if (!req.user) {
    res.render('index');
  }
});

module.exports = router;
