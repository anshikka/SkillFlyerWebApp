const express = require("express");
const subtopicRouter = express.Router({ mergeParams: true });
const profanityChecker = require("leo-profanity");

// Load Subtopic model
const Subtopic = require("../../models/Subtopic");
const Topic = require("../../models/Topic");

function getTopicId(name) {
  return Topic.findOne({ topic_name: name }).then((topic) => {
    if (topic) {
      return topic._id;
    } else {
      console.log("No topic found with name: " + name);
    }
  });
}

// @route POST api/:topic:/
// @desc add subtopic
// @access Public
subtopicRouter.post("/addSubtopic", async (req, res) => {
  t_id = await getTopicId(req.body.topic_id);
  Subtopic.findOne({
    subtopic_name: req.body.subtopic_name,
    topic_id: t_id,
  }).then((subtopic) => {
    if (subtopic) {
      return res.status(400).json({ message: "Subtopic already exists!" });
    } else {
      if (profanityChecker.check(req.body.subtopic_name)) {
        return res
          .status(403)
          .json({ message: "Innappropriate Subtopic Name" });
      }
      const newSubtopic = new Subtopic({
        subtopic_name: req.body.subtopic_name,
        topic_id: t_id,
        added_by: req.body.user_id,
        description: req.body.description,
        photo_url: req.body.photo_url,
      });
      newSubtopic.save().then((subtopic) => res.json(subtopic));
    }
  });
});

// @route GET api/subtopics/
// @desc return all subtopics based on topic
// @access Public
subtopicRouter.post("/", async (req, res) => {
  t_id = req.body.topic_id;
  Subtopic.find({ topic_id: t_id }).then((subtopics) => {
    // Check if topic exists
    if (subtopics.length == 0) {
      return res
        .status(404)
        .json({ message: "No subtopics exist under this topic!" });
    } else {
      return res.status(200).json(subtopics);
    }
  });
});

module.exports = subtopicRouter;
