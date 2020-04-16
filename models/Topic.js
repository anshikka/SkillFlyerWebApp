const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TopicSchema = new Schema({
  topic_name: {
    type: String,
    required: true
  },
  added_by: {
    type: mongoose.Schema.Types.ObjectId, ref: "users",
    required: true
  },
  photo_url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
module.exports = Topic = mongoose.model("topics", TopicSchema);
