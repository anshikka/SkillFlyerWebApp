const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FolderSchema = new Schema({
  folder_name: {
    type: String,
    required: true,
  },
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "videos",
      required: false,
    },
  ],
});
module.exports = Folder = mongoose.model("folders", FolderSchema);
