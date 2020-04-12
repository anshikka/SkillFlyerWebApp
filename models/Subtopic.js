const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SubtopicSchema = new Schema({
  subtopic_name: {
    type: String,
    required: true
  },
  topic_id: {
    type: mongoose.Schema.Types.ObjectId, ref: "topics",
    required: true
  },
  added_by: {
    type: mongoose.Schema.Types.ObjectId, ref: "users",
    required: true
  },
  photo_url: {
    type: String,
    required: true
  }
});
module.exports = Subtopic = mongoose.model("subtopics", SubtopicSchema);