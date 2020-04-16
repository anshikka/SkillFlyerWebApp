const express = require("express");
const topicRouter = express.Router();
const subtopicRouter = require("./subtopics");
const profanityChecker = require("leo-profanity");

// Load Topic model
const Topic = require("../../models/Topic");


// @route POST api/
// @desc add topic
// @access Public
topicRouter.post("/addTopic", (req, res) => {
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
        added_by: req.body.user_id,
        photo_url: req.body.photo_url,
        description: req.body.description
      });
      newTopic.save().then(topic => res.json(topic));
    }
  });
});
// @route GET api/topics
// @desc return all topics
// @access Public
topicRouter.get("/", (req, res) => {
  Topic.find({}).then(topics => {
    // Check if topics exists
    if (topics.length == 0) {
      return res.status(404).json({ topicsonotfound: "There are no topics!" });
    } else {
      return res.status(200).json(topics);
    }
  });
});


topicRouter.use("/:topic_name/", subtopicRouter);
module.exports = topicRouter;