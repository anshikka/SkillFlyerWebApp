const express = require("express");
const subtopicRouter = express.Router({ mergeParams: true });
const profanityChecker = require("leo-profanity");
const Subtopic = require("../../models/Subtopic");

/** @module api/subtopics */

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
subtopicRouter.get("/", (req, res) => {
  Subtopic.find({ topic_id: req.query.topic_id }).then((subtopics) => {
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
