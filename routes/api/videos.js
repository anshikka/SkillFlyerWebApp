const express = require("express");
const videoRouter = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const axios = require("axios");
const Video = require("../../models/Video");

/** @module api/videos */

/**
 * Returns the ID of a YouTube video from the YouTube video URL.
 *
 * @param {String} - YouTube URL
 *
 * @returns {String} Regex-captured ID from YouTube URL.
 */
function extractIdFromYouTubeVideo(youtube_url) {
  return youtube_url.match(
    /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/
  )[1];
}

/**
 * Checks if a video is educational.
 *
 * @param {Object} - YouTube Video Metadata.
 *
 * @returns {boolean} True if video matches educational criteria, false otherwise.
 */
function validateVideoSubmission(youtube_data) {
  const meta = youtube_data.data.items[0].snippet;
  if (meta.categoryId < "26" || meta.categoryId > "28") {
    return false;
  } else {
    return true;
  }
}

/**
 * Validates the link to ensure is is a YouTube link.
 *
 * @param {String} - YouTube Video URL.
 *
 * @returns {boolean} True if link is a YouTube URL, false otherwise.
 */
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

/**
 * Validates weather the object ID is valid for a Video object.
 *
 * @param {Object} - Video Object ID
 *
 * @returns {boolean} True if video has a valid object ID, false otherwise.
 */
function validateVideoID(video_id) {
  return mongoose.Types.ObjectId.isValid(video_id);
}

/**
 * Add a video.
 *
 * @name Video Add
 *
 * @route {POST} /videos/addVideo
 *
 * @bodyparam {String} [youtube_url] URL for YouTube Video.
 * @bodyparam {String} [subtopic_id] Subtopic ID to include YouTube video in.
 */
videoRouter.post("/addVideo", async (req, res) => {
  const youtubeId = extractIdFromYouTubeVideo(req.body.youtube_url);
  Video.findOne({
    youtube_id: youtubeId,
    subtopic_id: req.body.subtopic_id,
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
        if (!validateVideoSubmission(youtube_data)) {
          return res
            .status(400)
            .json({ message: "Video did not meet SkillFlyer's criteria!" });
        } else {
          const meta = youtube_data.data.items[0].snippet;
          const newVideo = new Video({
            youtube_url: req.body.youtube_url,
            youtube_id: youtubeId,
            subtopic_id: req.body.subtopic_id,
            votes: 0,
            title: meta.title,
            added_by: req.body.added_by,
            thumbnail_url: meta.thumbnails.medium.url,
            description: meta.description,
            topic_name: req.body.topic_name,
            subtopic_name: req.body.subtopic_name,
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

/**
 * Get a video by ID.
 *
 * @name Video Get
 *
 * @route {GET} /videos/:_id
 *
 * @routeparam {String} :_id is the unique identifier of a video object on SkillFlyer.
 */
videoRouter.get("/:_id", (req, res) => {
  if (!validateVideoID(req.params._id)) {
    return res.status(400).json({ message: "Invalid Video Link" });
  } else {
    // Find video by id
    Video.findOne({ _id: req.params._id }).then((video) => {
      // Check if video exists
      if (video) {
        return res.status(200).json(video);
      } else {
        return res.status(404).json({ message: "Video not found" });
      }
    });
  }
});

/**
 * Get all videos under subtopic.
 *
 * @name Videos Get
 *
 * @route {GET} /videos/
 *
 * @queryparam {String} [topic_name] is the unique identifier of a topic on SkillFlyer.
 * @queryparam {String} [subtopic_name] is the identifier of a subtopic on SkillFlyer.
 */
videoRouter.get("/", (req, res) => {
  // Find Videos by subtopic id
  Video.find({ topic_name: req.query.topic_name, subtopic_name: req.query.subtopic_name }).then((videos) => {
    // Check if videos exists
    if (videos.length == 0) {
      return res
        .status(200)
        .json({ message: "There are no videos under this subtopic!" });
    } else {
      return res.status(200).json(videos);
    }
  });
});

/**
 * Upvote a video
 *
 * @name Video Upvote
 *
 * @route {POST} /videos/upvote
 *
 * @bodyparam {String} [video_id] is the unique identifier of each video on SkillFlyer.
 */
videoRouter.post("/upvote", (req, res) => {
  Video.findOneAndUpdate(
    { _id: req.body.video_id },
    { $inc: { votes: 1 } }
  ).then(res.status(200).json({ message: "Video upvoted!" }));
});

/**
 * Downvote a video
 *
 * @name Video Downvote
 *
 * @route {POST} /videos/downvote
 *
 * @bodyparam {String} [video_id] is the unique identifier of each video on SkillFlyer.
 */
videoRouter.post("/downvote", (req, res) => {
  Video.findOneAndUpdate(
    { _id: req.body.video_id },
    { $inc: { votes: -1 } }
  ).then(res.status(200).json({ message: "Video downvoted!" }));
});

module.exports = videoRouter;
