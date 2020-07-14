const express = require("express");
const folderRouter = express.Router();
const profanityChecker = require("leo-profanity");
const Folder = require("../models/Folder");
const Video = require("../models/Video");

/** @module api/folders */

/**
 * Add a folder.
 *
 * @name Folder Add
 *
 * @route {POST} /folders/addFolder
 *
 * @bodyparam {String} [folder_name] Name of folder.
 * @bodyparam {String} [user_id] User ID adding folder.
 * @bodyparam {String} [is_required] Whether folder is permanent or not (Liked Videos satisfies this.).
 */
folderRouter.post("/addFolder", (req, res) => {
  Folder.findOne({
    folder_name: req.body.folder_name,
    added_by: req.body.user_id,
  }).then((folder) => {
    if (folder) {
      return res.status(400).json({ message: "Folder already exists!" });
    } else {
      if (profanityChecker.check(req.body.folder_name)) {
        return res.status(403).json({ message: "Innappropriate Folder Name" });
      }
      const newFolder = new Folder({
        is_required: false,
        folder_name: req.body.folder_name,
        added_by: req.body.user_id,
      });
      newFolder.save().then((folder) =>
        res.json({
          message: "Folder '" + folder.folder_name + "' successfully created",
        })
      );
    }
  });
});

/**
 * Get all folders by a user.
 *
 * @name Folders Get
 *
 * @route {GET} /folders/
 *
 * @queryparam {String} [user_id] User ID of folder.
 */
folderRouter.get("/", (req, res) => {
  Folder.find({
    added_by: req.query.user_id,
  }).then((folders) => {
    if (folders) {
      return res.status(200).json(folders);
    } else {
      return res
        .status(404)
        .json({ message: "There are no folders for this user." });
    }
  });
});

/**
 * Get a folder by ID.
 *
 * @name Folder Get
 *
 * @route {GET} /folders/:_id
 *
 * @routeparam {String} :_id is the ID of the folder.
 */
folderRouter.get("/:_id", (req, res) => {
  // Find folder by name and user id -> returns all videos in folder
  Folder.findOne({ _id: req.params._id }).then((folder) => {
    // Check if folder exists
    if (folder) {
      return res.status(200).json(folder);
    } else {
      return res.status(404).json({ message: "Folder not found" });
    }
  });
});

/**
 * Get a videos and their data in a folder.
 *
 * @name Folder Get Videos
 *
 * @route {GET} /folders/:_id/videos
 *
 * @routeparam {String} :_id is the ID of the folder.
 */
folderRouter.get("/:_id/videos", (req, res) => {
  // Find folder by name and user id -> returns all videos in folder
  Folder.findOne({ _id: req.params._id }).then((folder) => {
    // Check if folder exists
    if (folder) {
      videos = [];
      var retrieveVideos = new Promise((resolve, reject) => {
        folder.videos.forEach((videoId) => {
          return Video.findOne({ _id: videoId }).then((video) => {
            videos.push(video);
            if (videos.length === folder.videos.length) resolve();
          });
        });
      });
      retrieveVideos.then(() => {
        return res.status(200).json(videos);
      });
    } else {
      return res.status(404).json({ message: "Folder not found" });
    }
  });
});

/**
 * Add video to a folder.
 *
 * @name Folder Add Video
 *
 * @route {POST} /folders/addVideo
 *
 * @bodyparam {String} [folder_id] ID of folder.
 * @bodyparam {String} [video_id] ID of video being added.
 */
folderRouter.post("/addVideo", (req, res) => {
  Folder.findOne({
    _id: req.body.folder_id,
    videos: { $in: [req.body.video_id] },
  }).then((video) => {
    if (video) {
      return res
        .status(400)
        .json({ message: "Video already exists in folder!" });
    } else {
      Folder.findOneAndUpdate(
        { _id: req.body.folder_id },
        {
          $push: {
            videos: req.body.video_id,
          },
        }
      ).then((folder) => {
        return res
          .status(200)
          .json({ message: "Video Added to '" + folder.folder_name + "'" });
      });
    }
  });
});

/**
 * Delete video from a folder.
 *
 * @name Folder Delete Video
 *
 * @route {PUT} /folders/deleteVideo
 *
 * @bodyparam {String} [folder_id] ID of folder.
 * @bodyparam {String} [video_id] ID of video being added.
 */
folderRouter.put("/deleteVideo", (req, res) => {
  Folder.findOne({
    _id: req.body.folder_id,
    videos: { $in: [req.body.video_id] },
  }).then((video) => {
    if (video) {
      Folder.findOneAndUpdate(
        { _id: req.body.folder_id },
        {
          $pull: {
            videos: req.body.video_id,
          },
        }
      ).then((folder) => {
        return res
          .status(200)
          .json({ message: "Video Removed From '" + folder.folder_name + "'" });
      });
    }
  });
});

/**
 * Delete a folder.
 *
 * @name Folder Delete
 *
 * @route {PUT} /folders/deleteFolder
 *
 * @bodyparam {String} [folder_id] ID of folder.
 * @bodyparam {String} [is_required] Whether folder is permanent or not (Liked Videos satisfies this.).
 */
folderRouter.put("/deleteFolder", (req, res) => {
  const is_required = req.body.is_required === "true";
  if (!is_required) {
    Folder.deleteOne({
      _id: req.body.folder_id,
    }).then(res.status(200).json({ message: "Folder deleted!" }));
  } else {
    res.status(400).json({ message: "This folder cannot be deleted!" });
  }
});

module.exports = folderRouter;
