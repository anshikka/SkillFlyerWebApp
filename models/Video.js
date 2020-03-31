const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../../models/User");

// Create Schema
const VideoSchema = new Schema({
  youtube_id: {
    type: String,
    required: true
  },
  topic_id: {
      type: String,
      required: true
  },
  subtopic_id: {
      type: String, 
      required: true
  },
  added_by: {
      type: mongoose.Schema.Types.ObjectId, ref: "users",
      required: true
  },
  votes: {
      type: Number,
      required: true,
      default: 0
  },
  title : {
      type: String,
      required: true
  },
  youtube_url: {
      type: String,
      required: true
  }
});
module.exports = Video = mongoose.model("videos", VideoSchema);