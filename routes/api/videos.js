const express = require("express");
const router = express.Router();
// Load Video model
const Video = require("../../models/Video");

function extractIdFromVideo(youtube_url) {
  return youtube_url.match(
    /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/
  )[1];
}

function validateVideoLink(youtube_url) {
  return youtube_url.match(
    /http:\/\/(?:www\.)?youtube.*watch\?v=([a-zA-Z0-9\-_]+)/
  );
}
// @route POST api/videos/newVideo
// @desc add video
// @access Public
router.post("/:topic_id/:subtopic_id/newVideo", (req, res) => {
  Video.findOne({
    youtube_id: req.body.youtube_id,
    subtopic_id: req.params.subtopic_id
  }).then(video => {
    if (video) {
      return res
        .status(400)
        .json({ message: "Video already exists under this subtopic!" });
    }
    if (!validateVideoLink(req.body.youtube_url)) {
      return res.status(400).json({ message: "Invalid YouTube URL!" });
    } else {
      const newVideo = new Video({
        youtube_url: req.body.youtube_url,
        youtube_id: extractIdFromVideo(req.body.youtube_url),
        topic_id: req.params.topic_id,
        subtopic_id: req.params.subtopic_id,
        votes: 0,
        title: req.body.title
      });
    }
  });
});

// @route POST api/videos
// @desc post video to subtopic and return video object
// @access Public
router.get("/:topic_id/:subtopic_id/:_id", (req, res) => {
  const video_id = req.params._id;
  // Find video by id
  Video.findOne({ _id: video_id }).then(video => {
    // Check if video exists
    if (!video) {
      return res.status(404).json({ videonotfound: "Video not found" });
    } else {
      return res.status(200).json(video);
    }
  });
});

router.get("/:topic_id/:subtopic_id/", (req, res) => {
  const subtopic = req.params.subtopic_id;
  // Find Videos by subtopic id
  Video.find({ subtopic_id: subtopic }).then(videos => {
    // Check if videos exists
    if (!videos) {
      return res
        .status(404)
        .json({ videsonotfound: "There are no Videos under this subtopic!" });
    } else {
      return res.status(200).json(videos);
    }
  });
});

module.exports = router;
