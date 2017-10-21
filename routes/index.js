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
    // if (req.user.description === 'admin') {
    //   RequestJob.find(
    //     {},
    //     (err, requestJob) => {
    //         if (err) { return next(err); }
    //         res.render('index', requestJob);
    //     }
    //   );
    // }
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
