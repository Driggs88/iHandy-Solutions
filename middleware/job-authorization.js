const RequestJob = require('../models/requestJob');

function authorizeJob(req, res, next){
  RequestJob.findById(req.params.id, (err, job) => {
    // If there's an error, forward it
    if (err)      { return next(err); }
    // If there is no campaign, return a 404
    if (!job){ return next(new Error('404')) }
    // If the campaign belongs to the user, next()
    if (job.belongsTo(req.user)){
      return next()
    } else {
      return res.redirect(`/`);
    }
  });
}
function checkOwnership(req, res, next){
  RequestJob.findById(req.params.id, (err, job) => {
    if (err){ return next(err) }
    if (!job){ return next(new Error('404')) }

    // if(typeof(req.user)==='undefined')
    // res.locals.campaignIsCurrentUsers = '';

    if (campaign.belongsTo(req.user)){
      res.locals.jobIsCurrentUsers = true;
    } else {
      res.locals.jobIsCurrentUsers = false;
    }
    return next()
  });
}

// ...

module.exports = {
  authorizeJob,
  checkOwnership
}
