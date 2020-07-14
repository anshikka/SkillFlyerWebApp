const express = require("express");
const topicRouter = express.Router();
const profanityChecker = require("leo-profanity");
const Topic = require("../models/Topic");

/** @module api/topics */

/**
 * Add a topic.
 *
 * @name Topic Add
 *
 * @route {POST} /topics/addTopic
 *
 * @bodyparam {String} [topic_name] Name of topic.
 * @bodyparam {String} [added_by] User ID adding topic.
 * @bodyparam {String} [photo_url] Photo of Topic.
 * @bodyparam {String} [description] Description of topic.
 */
topicRouter.post("/addTopic", (req, res) => {
  Topic.findOne({
    topic_name: req.body.topic_name,
  }).then((topic) => {
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
        description: req.body.description,
      });
      newTopic.save().then((topic) => res.json(topic));
    }
  });
});

/**
 * Get all topics.
 *
 * @name Topics Get
 *
 * @route {GET} /topics/
 */
topicRouter.get("/", (req, res) => {
  Topic.find({}).then((topics) => {
    // Check if topics exists
    if (topics.length == 0) {
      return res.status(404).json({ message: "There are no topics!" });
    } else {
      return res.status(200).json(topics);
    }
  });
});

module.exports = topicRouter;
