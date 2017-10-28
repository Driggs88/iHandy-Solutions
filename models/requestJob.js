const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const TYPES    = require('./job-types');
const User = require('./user');
const moment = require('moment');


const requestJobSchema = new Schema({
  title         : { type: String, required: true },
  category      : { type: String, enum: TYPES, required: true },
  description   : { type: String, required: true },
  _creator      : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  deadline      : { type: Date, required: true },
  pic_path      : String,
  pic_name      : String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

requestJobSchema.virtual('inputFormattedDate').get(function(){
  return moment(this.deadline).format('YYYY-MM-DD');
});

requestJobSchema.methods.belongsTo = function(user){
  return this._creator.equals(user._id);
}

const requestJob = mongoose.model("requestJob", requestJobSchema);
module.exports = requestJob;
