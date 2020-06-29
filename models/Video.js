const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VideoSchema = new Schema({
  youtube_id: {
    type: String,
    required: true,
  },
  topic_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "topics",
    required: true,
  },
  subtopic_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subtopics",
    required: true,
  },
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  votes: {
    type: Number,
    required: true,
    default: 0,
  },
  title: {
    type: String,
    required: true,
  },
  youtube_url: {
    type: String,
    required: true,
  },
  thumbnail_url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});
module.exports = Video = mongoose.model("videos", VideoSchema);
