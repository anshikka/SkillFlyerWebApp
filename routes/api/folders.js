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
    added_by: req.body.user_id
  }).then(folder => {
    if (folder) {
      return res.status(400).json({ message: "Folder already exists!" });
    } else {
      if (profanityChecker.check(req.body.folder_name)) {
        return res.status(403).json({ message: "Innappropriate Folder Name" });
      }
      const newFolder = new Folder({
        folder_name: req.body.folder_name,
        added_by: req.body.user_id
      });
      newFolder.save().then(folder => res.json(folder));
    }
  });
});

// @route GET api/topics
// @desc return all topics
// @access Public
folderRouter.get("/", (req, res) => {
  Folder.find({}).then(folders => {
    // Check if topics exists
    if (folders.length == 0) {
      return res
        .status(404)
        .json({ foldersonotfound: "You haven't created any folders!" });
    } else {
      return res.status(200).json(folders);
    }
  });
});

folderRouter.get("/:folder_name", (req, res) => {
  const f_name = req.params.folder_name;
  const u_id = req.body.user_id;
  // Find video by id
  Folder.findOne({ folder_name: f_name, added_by: u_id }).then(folder => {
    // Check if video exists
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
    videos : {$in: [v_id]}
  }).then(folderVideoObj => {
    if (folderVideoObj) {
      return res
        .status(400)
        .json({ message: "Video already exists in folder!" });
    } else {
       Folder.updateOne(
           {_id: f_id},
           {
               $push:
                 {    
                    videos: v_id
                }
           }
       ).then(res.json({message: "Video Added to Folder"}))
    }
  });
});

folderRouter.delete("/deleteFolder", (req, res) => {
  const f_id = req.body.folder_id;
  const u_id = req.body.user_id;
  Folder.deleteOne({_id: f_id, added_by: u_id}).then(res.json({message: "Folder deleted!"}));
});
module.exports = folderRouter;
