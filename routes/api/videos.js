const express = require("express");
const videoRouter = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const axios = require("axios");

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

function validateVideoSubmission(youtube_data) {
  const meta = youtube_data.data.items[0].snippet;
  if (meta.categoryId < "26" || meta.categoryId > "28") {
    return { status: "CRITERIA UNMATCHED" };
  } else {
    return { status: "CRITERIA MATCHED" };
  }
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
      console.log("No topic with this name!")
    }
  });
}

function getSubtopicId(name) {
  return Subtopic.findOne({ subtopic_name: name }).then((subtopic) => {
    if (subtopic) {
      return subtopic._id;
    } else {
      console.log("No subtopic with this name!")
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
  s_id = req.body.subtopic_id;
  Video.findOne({
    youtube_url: req.body.youtube_url,
    subtopic_id: s_id,
  }).then((video) => {
    if (video) {
      return res
        .status(400)
        .json({ message: "Video already exists under this subtopic!" });
    } else {
      if (!validateYouTubeLink(req.body.youtube_url)) {
        return res.status(400).json({ message: "Invalid YouTube URL!" });
      }
      // call youtube api to get video details
      youtube_req_url =
        "https://www.googleapis.com/youtube/v3/videos?id=" +
        extractIdFromYouTubeVideo(req.body.youtube_url) +
        "&key=AIzaSyB15z0q8x96VGbfxydmMTvIuBoxD6YWLzw&part=snippet,contentDetails,statistics,status";
      axios.get(youtube_req_url).then((youtube_data) => {
        if (
          validateVideoSubmission(youtube_data).status === "CRITERIA UNMATCHED"
        ) {
          
          return res
            .status(400)
            .json({ message: "Video did not meet SkillFlyer's criteria!" });
        } else {
          const meta = youtube_data.data.items[0].snippet;
          const newVideo = new Video({
            youtube_url: req.body.youtube_url,
            youtube_id: extractIdFromYouTubeVideo(req.body.youtube_url),
            subtopic_id: s_id,
            votes: 0,
            title: meta.title,
            added_by: req.body.added_by,
            thumbnail_url: meta.thumbnails.medium.url,
            description: meta.description,
            topic_name: req.body.topic_name,
            subtopic_name: req.body.subtopic_name
          });

          newVideo.save().then(() =>
            res.status(200).json({
              message: "Successfuly Submited Video to SkillFlyer!",
            })
          );
        }
      });
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

videoRouter.post("/", (req, res) => {
  const subtopic = req.body.subtopic_id;
  // Find Videos by subtopic id
  Video.find({ subtopic_id: subtopic }).then((videos) => {
    // Check if videos exists
    if (videos.length == 0) {
      return res
        .status(200)
        .json({ videsonotfound: "There are no videos under this subtopic!" });
    } else {
      return res.status(200).json(videos);
    }
  });
});

videoRouter.post("/upvote", (req, res) => {
  const videoId = req.body.video_id;
  Video.findOneAndUpdate({ _id: videoId }, { $inc: { votes: 1 } }).then(
    res.status(200).json({ message: "Video upvoted!" })
  );
});

videoRouter.post("/undoUpvote", (req, res) => {
  const videoId = req.body.video_id;
  Video.findOneAndUpdate({ _id: videoId }, { $inc: { votes: -1 } }).then(
    res.status(200).json({ message: "Video upvote removed!" })
  );
});

videoRouter.post("/downvote", (req, res) => {
  const videoId = req.body.video_id
  Video.findOneAndUpdate({ _id: videoId }, { $inc: { votes: -1 } }).then(
    res.status(200).json({ message: "Video downvoted!" })
  );
});

videoRouter.post("/undoDownvote", (req, res) => {
  const videoId = req.body.video_id;
  Video.findOneAndUpdate({ _id: videoId }, { $inc: { votes: 1 } }).then(
    res.status(200).json({ message: "Video downvote removed!" })
  );
});

module.exports = videoRouter;
