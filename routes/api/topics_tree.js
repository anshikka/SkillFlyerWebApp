const express = require("express");
const router = express.Router();
const profanityChecker = require("leo-profanity");

// Load Subtopic model
const Subtopic = require("../../models/Subtopic");
const Topic = require("../../models/Topic");

function getTopicId(name){
    Topic.findOne({topic_name: name}).then(topic=> {
      if (topic){
        return topic._id;
      } else {
        return res.status(404).json({message: "There is no such topic with this name!"});
      }
    });
  
  }

// @route POST api/
// @desc add topic
// @access Public
router.post("/addTopic", (req, res) => {
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

// @route POST api/:topic:/
// @desc add subtopic
// @access Public
router.post("/:topic_name/addSubtopic", (req, res) => {
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



// @route GET api/:topic_name/:subtopic_topic_name
// @desc return all subtopics under topic
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

module.exports = router;

// @route GET api/topics
// @desc return all topics
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