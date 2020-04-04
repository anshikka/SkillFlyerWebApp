const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  education_institution: {
    type: String
  },
  liked_videos: [{
    type: mongoose.Schema.Types.ObjectId, ref: "videos",
    required: false
  }],
  disliked_videos: [{
    type: mongoose.Schema.Types.ObjectId, ref: "videos",
    required: false
  }]
});
module.exports = User = mongoose.model("users", UserSchema);