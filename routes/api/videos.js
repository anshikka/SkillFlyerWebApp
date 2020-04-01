const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Load Video model
const Video = require("../../models/Video");
// Load Topic Model
const Topic = require("../../models/Topic");
// Load Subtopic Model
const Subtopic = require("../models/Subtopic");

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

function getTopicId(name){
  Topic.findOne({topic_name: name}).then(topic=> {
    if (topic){
      return topic._id;
    } else {
      return res.status(404).json({message: "There is no such topic with this name!"});
    }
  });

}

function getSubtopicId(name){
  Subtopic.findOne({subtopic_name: name}).then(subtopic=> {
    if (subtopic){
      return subtopic._id;
    } else {
      return res.status(404).json({message: "There is no such subtopic with this name!"});
    }
  })

}

function validateVideoID(video_id) {
  return mongoose.Types.ObjectId.isValid(video_id);
}
// @route POST api/videos/newVideo
// @desc add video
// @access Public
router.post("/:topic_name/:subtopic_name/addVideo", (req, res) => {
  Video.findOne({
    youtube_url: req.body.youtube_url,
    subtopic_id: getSubtopicId(req.params.subtopic_name),
    topic_id: getTopicId(req.params.topic_name)
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
        topic_id: getTopicId(req.params.topic_name),
        subtopic_id: getSubtopicId(req.params.subtopic_name),
        votes: 0,
        title: req.body.title,
        added_by: req.body.user_id
      });
      newVideo.save().then(video => res.json(video));
    }
  });
});

// @route GET api/videos
// @desc post video to subtopic and return video object
// @access Public
router.get("/:topic_name/:subtopic_name/:_id", (req, res) => {
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

router.get("/:topic_name/:subtopic_name/", (req, res) => {
  const subtopic = getSubtopicId(req.params.subtopic_name);
  const topic = getTopicId(req.params.topic_name);
  // Find Videos by subtopic id
  Video.find({ topic_id: topic, subtopic_id: subtopic }).then(videos => {
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
