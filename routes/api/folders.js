const express = require("express");
const folderRouter = express.Router();
const profanityChecker = require("leo-profanity");

// Load Topic model
const Folder = require("../../models/Folder");

// @route POST api/
// @desc add topic
// @access Public
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
      newFolder
        .save()
        .then((folder) =>
          res.json({
            message: "Folder '" + folder.folder_name + "' successfully created",
          })
        );
    }
  });
});

// @route GET api/folders/
// @desc return all folders
// @access Public
folderRouter.post("/", (req, res) => {
  Folder.find({
    added_by: req.body.user_id,
  }).then((folders) => {
    return res.status(200).json(folders);
  });
});

folderRouter.post("/:folder_name", (req, res) => {
  const f_name = req.params.folder_name;
  const u_id = req.body.user_id;
  // Find folder by name and user id -> returns all videos in folder
  Folder.findOne({ folder_name: f_name, added_by: u_id }).then((folder) => {
    // Check if folder exists
    if (folder) {
      return res.status(200).json(folder);
    } else {
      return res.status(404).json({ message: "Folder not found" });
    }
  });
});

folderRouter.post("/:folder_name/addVideo", (req, res) => {
  const v_id = req.body.video_id;
  const f_id = req.body.folder_id;
  Folder.findOne({
    _id: f_id,
    videos: { $in: [v_id] },
  }).then((folderVideoObj) => {
    if (folderVideoObj) {
      return res
        .status(400)
        .json({ message: "Video already exists in folder!" });
    } else {
      Folder.updateOne(
        { _id: f_id },
        {
          $push: {
            videos: v_id,
          },
        }
      ).then(res.json({ message: "Video Added to Folder" }));
    }
  });
});

folderRouter.delete("/:folder_name/deleteVideo", (req, res) => {
  const v_id = req.body.video_id;
  const f_id = req.body.folder_id;
  Folder.findOne({
    _id: f_id,
    videos: { $in: [v_id] },
  }).then((folderVideoObj) => {
    if (folderVideoObj) {
      Folder.updateOne(
        { _id: f_id },
        {
          $pull: {
            videos: v_id,
          },
        }
      ).then(res.json({ message: "Video Removed From Folder" }));
    }
  });
});

folderRouter.delete("/deleteFolder", (req, res) => {
  const f_id = req.body.folder_id;
  const u_id = req.body.user_id;
  const is_required = req.body.is_required;
  if (!is_required) {
    Folder.deleteOne({ _id: f_id, added_by: u_id }).then(
      res.json({ message: "Folder deleted!" })
    );
  } else {
    res.json({ message: "This folder cannot be deleted!" });
  }
});
module.exports = folderRouter;
