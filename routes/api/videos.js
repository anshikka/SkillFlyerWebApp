const express = require("express");
const videoRouter = express.Router({ mergeParams: true });
const mongoose = require("mongoose");

// Load Video model
const Video = require("../../models/Video");
// Load Topic Model
const Topic = require("../../models/Topic");
// Load Subtopic Model
const Subtopic = require("../../models/Subtopic");
const User = require("../../models/User");

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

function getTopicId(name) {
  return Topic.findOne({ topic_name: name }).then((topic) => {
    if (topic) {
      return topic._id;
    } else {
      //return res.status(404).json({message: "There is no such topic with this name!"});
    }
  });
}

function getSubtopicId(name) {
  return Subtopic.findOne({ subtopic_name: name }).then((subtopic) => {
    if (subtopic) {
      return subtopic._id;
    } else {
      console.log("No such subtopic with name!");
    }
  });
}

function validateVideoID(video_id) {
  return mongoose.Types.ObjectId.isValid(video_id);
}
// @route POST api/videos/newVideo
// @desc add video
// @access Public
videoRouter.post("/addVideo", async (req, res) => {
  s_id = await getSubtopicId(req.params.subtopic_name);
  t_id = await getTopicId(req.params.topic_name);
  Video.findOne({
    youtube_url: req.body.youtube_url,
    subtopic_id: s_id,
    topic_id: t_id,
  }).then((video) => {
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
        topic_id: t_id,
        subtopic_id: s_id,
        votes: 0,
        title: req.body.title,
        added_by: req.body.user_id,
        thumbnail_url: req.body.thumbnail_url,
        description: req.body.description,
      });
      newVideo.save().then((video) => res.json(video));
    }
  });
});

// @route GET api/videos
// @desc get video from subtopic and return video object
// @access Public
videoRouter.get("/:_id", (req, res) => {
  const video_id = req.params._id;
  if (!validateVideoID(video_id)) {
    return res.status(400).json({ message: "Invalid Video Link" });
  } else {
    // Find video by id
    Video.findOne({ _id: video_id }).then((video) => {
      // Check if video exists
      if (video) {
        return res.status(200).json(video);
      } else {
        return res.status(404).json({ message: "Video not found" });
      }
    });
  }
});

videoRouter.get("/", async (req, res) => {
  const subtopic = await getSubtopicId(req.params.subtopic_name);
  const topic = await getTopicId(req.params.topic_name);
  // Find Videos by subtopic id
  Video.find({ topic_id: topic, subtopic_id: subtopic }).then((videos) => {
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

videoRouter.put("/:_id/upvote", (req, res) => {
  const videoId = req.params._id;
  Video.findOneAndUpdate({ _id: videoId }, { $inc: { votes: 1 } }).then(
    res.json({ message: "Video upvoted!" })
  );
});

videoRouter.put("/:_id/undoUpvote", (req, res) => {
  const videoId = req.params._id;
  Video.findOneAndUpdate({ _id: videoId }, { $inc: { votes: -1 } }).then(
    res.json({ message: "Video upvote removed!" })
  );
});

videoRouter.put("/:_id/downvote", (req, res) => {
  const videoId = req.params._id;
  Video.findOneAndUpdate({ _id: videoId }, { $inc: { votes: -1 } }).then(
    res.json({ message: "Video downvoted!" })
  );
});

videoRouter.put("/:_id/undoDownvote", (req, res) => {
  const videoId = req.params._id;
  Video.findOneAndUpdate({ _id: videoId }, { $inc: { votes: 1 } }).then(
    res.json({ message: "Video downvote removed!" })
  );
});

module.exports = videoRouter;
