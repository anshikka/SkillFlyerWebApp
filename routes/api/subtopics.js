const express = require("express");
const router = express.Router();
const profanityChecker = require("leo-profanity");

// Load Subtopic model
const Subtopic = require("../../models/Subtopic");

function getTopicId(name){
    Topic.findOne({topic_name: name}).then(topic=> {
      if (topic){
        return topic._id;
      } else {
        return res.status(404).json({message: "There is no such topic with this name!"});
      }
    });
  
  }
// @route POST api/:topic:/subtopic
// @desc add subtopic
// @access Public
router.post("/:topic_name/", (req, res) => {
  topic_id = getTopicId(req.params.topic_name)
  Subtopic.findOne({
    topic_id: topic_id,
    subtopic_name: req.body.subtopic_name
  }).then(subtopic => {
    if (subtopic) {
      return res.status(400).json({ message: "Subtopic already exists under this topic!" });
    } else {
      if (profanityChecker.check(req.body.subtopic_name)) {
        return res.status(403).json({ message: "Innappropriate Subtopic Name" });
      }
      const newSubtopic = new Subtopic({
        subtopic_name: req.body.subtopic_name,
        added_by: req.body.user_id
      });
      newSubtopic.save().then(subtopic => res.json(subtopic));
    }
  });
});

// @route GET api/:topic_name/:subtopic_name
// @desc return specific subtopic
// @access Public
router.get("/:topic_name/:subtopic_name", (req, res) => {
  const name = req.params.subtopic_name;
  const topic_id = getTopicId(req.params.topic_name)
  Subtopic.findOne({ topic_id: topic_id, subtopic_name: name }).then(subtopic => {
    // Check if subtopic exists
    if (subtopic) {
      return res.status(200).json(topic);
    } else {
      return res.status(404).json({ message: "Subtopic not found" });
    }
  });
});

// can already retrieve all suptopics in topics area

module.exports = router;
