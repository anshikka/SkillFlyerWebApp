const express = require("express");
const subtopicRouter = express.Router({ mergeParams: true });
const profanityChecker = require("leo-profanity");
const Subtopic = require("../../models/Subtopic");

/** @module api/subtopics */

/**
 * Returns the ID of a topic from the topic name.
 *
 * @param {String} - Topic Name
 *
 * @returns {String} Topic ID retrieved by name from database.
 */
function getTopicId(name) {
  return Topic.findOne({ topic_name: name }).then((topic) => {
    if (topic) {
      return topic._id;
    } else {
      return false;
    }
  });
}

/**
 * Add a subtopic.
 *
 * @name Subtopic Add
 *
 * @route {POST} /subtopics/addSubtopic
 *
 * @bodyparam {String} [subtopic_name] Name of subtopic.
 * @bodyparam {String} [topic_id] Parent topic's ID.
 * @bodyparam {String} [added_by] User ID adding subtopic.
 * @bodyparam {String} [photo_url] Photo of subtopic.
 * @bodyparam {String} [description] Description of subtopic.
 */
subtopicRouter.post("/addSubtopic", (req, res) => {
  Subtopic.findOne({
    subtopic_name: req.body.subtopic_name,
    topic_id: req.body.subtopic_id,
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
        topic_id: req.body.topic_id,
        added_by: req.body.user_id,
        description: req.body.description,
        photo_url: req.body.photo_url,
      });
      newSubtopic.save().then((subtopic) => res.json(subtopic));
    }
  });
});

/**
 * Get all subtopics under a topic.
 *
 * @name Subtopics Get
 *
 * @route {GET} /subtopics/
 *
 * @queryparam {String} [topic_id] Parent topic's ID.
 */
subtopicRouter.get("/", async (req, res) => {
  const topicId = await getTopicId(req.query.topic_name);
  if (topicId === false) {
    return res.status(404).json({ message: "This topic does not exist." });
  } else {
    Subtopic.find({ topic_id: topicId }).then((subtopics) => {
      // Check if topic exists
      if (subtopics.length == 0) {
        return res
          .status(404)
          .json({ message: "No subtopics exist under this topic!" });
      } else {
        return res.status(200).json(subtopics);
      }
    });
  }
});

/**
 * Search for a subtopic.
 *
 * @name Subtopics Search
 *
 * @route {GET} /subtopics/search/
 *
 * @queryparam {String} [q] is the search query to find a certain video.
 */
subtopicRouter.get("/search", (req, res) => {
  var query = new RegExp(".*" + req.query.q + ".*");
  Subtopic.find({ subtopic_name:  {$regex: query, $options: "i"} }).then((subtopics) => {
    // Check if topic exists
    if (subtopics.length == 0) {
      return res
        .status(404)
        .json({
          message: "There were no subtopics found that matched the search query!",
        });
    } else {
      return res.status(200).json(subtopics);
    }
  });
});

module.exports = subtopicRouter;
