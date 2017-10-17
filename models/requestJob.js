const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
// const TYPES    = require('./requestJob');

const requestJobSchema = new Schema({
  name: String,
  pic_path: String,
  pic_name: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

var requestJob = mongoose.model("requestJob", requestJobSchema);
module.exports = requestJob;
