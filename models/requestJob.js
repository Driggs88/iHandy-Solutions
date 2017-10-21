const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const TYPES    = require('./job-types');
const User = require('./user');


const requestJobSchema = new Schema({
  title         : { type: String, require: true },
  category      : { type: String, enum: TYPES, required: true },
  description   : { type: String, require: true },
  _creator      : { type: Schema.Types.ObjectId, ref: 'User', require: true },
  deadline      : { type: Date, require: true },
  pic_path      : String,
  pic_name      : String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

var requestJob = mongoose.model("requestJob", requestJobSchema);
module.exports = requestJob;
