const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Load Video model
const Video = require("../../models/Video");

function extractIdFromYouTubeVideo(youtube_url) {
  return youtube_url.match(
    /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/
  )[1];
}

function validateYouTubeLink(youtube_url) {
  var url = youtube_url;
  if (url != undefined || url != "") {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return true;
    } else {
      return false;
    }
  }
}

function validateVideoID(video_id) {
  return mongoose.Types.ObjectId.isValid(video_id);
}
// @route POST api/videos/newVideo
// @desc add video
// @access Public
router.post("/:topic_id/:subtopic_id/newVideo", (req, res) => {
  Video.findOne({
    youtube_url: req.body.youtube_url,
    subtopic_id: req.params.subtopic_id
  }).then(video => {
    if (video) {
      return res
        .status(400)
        .json({ message: "Video already exists under this subtopic!" });
    } else {
      if (!validateYouTubeLink(req.body.youtube_url)) {
        return res.status(400).json({ message: "Invalid YouTube URL!" });
      }
      const newVideo = new Video({
        youtube_url: req.body.youtube_url,
        youtube_id: extractIdFromYouTubeVideo(req.body.youtube_url),
        topic_id: req.params.topic_id,
        subtopic_id: req.params.subtopic_id,
        votes: 0,
        title: req.body.title,
        added_by: req.body.user_id
      });
      newVideo.save().then(video => res.json(video));
    }
  });
});

// @route POST api/videos
// @desc post video to subtopic and return video object
// @access Public
router.get("/:topic_id/:subtopic_id/:_id", (req, res) => {
  const video_id = req.params._id;
  if (!validateVideoID(video_id)) {
    return res.status(400).json({ message: "Invalid Video Link" });
  } else {
    // Find video by id
    Video.findOne({ _id: video_id }).then(video => {
      // Check if video exists
      if (video) {
        return res.status(200).json(video);
      } else {
        return res.status(404).json({ message: "Video not found" });
      }
    });
  }
});

router.get("/:topic_id/:subtopic_id/", (req, res) => {
  const subtopic = req.params.subtopic_id;
  // Find Videos by subtopic id
  Video.find({ subtopic_id: subtopic }).then(videos => {
    // Check if videos exists
    if (videos.length == 0) {
      return res
        .status(404)
        .json({ videsonotfound: "There are no videos under this subtopic!" });
    } else {
      return res.status(200).json(videos);
    }
  });
});

module.exports = router;
