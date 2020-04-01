const express = require("express");
const router = express.Router();
const profanityChecker = require("leo-profanity");

// Load Topic model
const Topic = require("../../models/Topic");

// @route POST api/newTopic
// @desc add topic
// @access Public
router.post("/", (req, res) => {
  Topic.findOne({
    topic_name: req.body.topic_name
  }).then(topic => {
    if (topic) {
      return res.status(400).json({ message: "Topic already exists!" });
    } else {
      if (profanityChecker.check(req.body.topic_name)) {
        return res.status(403).json({ message: "Innappropriate Topic Name" });
      }
      const newTopic = new Topic({
        topic_name: req.body.topic_name,
        added_by: req.body.user_id
      });
      newTopic.save().then(topic => res.json(topic));
    }
  });
});

// @route GET api/topics
// @desc return topic
// @access Public
router.get("/:topic_name/", (req, res) => {
  const name = req.params.topic_name;

  Topic.findOne({ topic_name: name }).then(topic => {
    // Check if topic exists
    if (topic) {
      return res.status(200).json(topic);
    } else {
      return res.status(404).json({ message: "Topic not found" });
    }
  });
});

// @route GET api/topics
// @desc return topic
// @access Public
router.get("/", (req, res) => {
  Topic.find({ }).then(topics => {
    // Check if topics exists
    if (topics.length == 0) {
      return res
        .status(404)
        .json({ topicsonotfound: "There are no topics!" });
    } else {
      return res.status(200).json(topics);
    }
  });
});

module.exports = router;
