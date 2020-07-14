const express = require("express");
const userRouter = express.Router({ mergeParams: true });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/User");
const Folder = require("../../models/Folder");

/** @module api/users */

/**
 * Create a user.
 *
 * @name User Add
 *
 * @route {POST} /users/register
 *
 * @bodyparam {String} [name] User's full name.
 * @bodyparam {String} [email] User's email.
 * @bodyparam {String} [password] User's password.
 * @bodyparam {String} [education_institution] User's school.
 */
userRouter.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        education_institution: req.body.education_institution,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            const likedVideosFolder = new Folder({
              is_required: true,
              folder_name: "Liked Videos",
              added_by: user.id,
            });
            likedVideosFolder.save().then(() => {
              res.json({ message: "User created!" });
            });
          });
        });
      });
    }
  });
});

/**
 * Get all users.
 *
 * @name User Get
 *
 * @route {GET} /users/
 */
userRouter.get("/", (req, res) => {
  return res.status(403).json({ message: "Forbidden" });
});

/**
 * Log a user into SkillFlyer.
 *
 * @name User Login
 *
 * @route {POST} /users/login
 *
 * @bodyparam {String} [email] User's email.
 * @bodyparam {String} [password] User's password.
 */
userRouter.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

/**
 * Get a user by ID.
 *
 * @name User Get
 *
 * @route {GET} /users/:_id
 *
 * @routeparam {String} :_id is the User's ID
 */
userRouter.post("/getUser", (req, res) => {
  User.findById(req.body.user_id).then((user) => {
    // Check if user exists
    if (user) {
      const payload = {
        name: user.name,
        education_institution: user.education_institution,
      };
      res.status(200).json(payload);
    } else {
      res.status(404).json({ error: "User Deleted" });
    }
  });
});

/**
 * Get weather a user liked a video.
 *
 * @name User Liked
 *
 * @route {GET} /users/inLikedVideos
 *
 * @queryparam {String} :_id is the User's ID.
 * @queryparam {String} [video_id] Video ID.
 */
userRouter.get("/inLikedVideos", (req, res) => {
  User.findOne({ _id: req.query.user_id }).then((user) => {
    // Check if user exists
    if (user) {
      if (user.liked_videos.includes(req.query.video_id)) {
        res.status(200).json({ video_liked: true });
      } else {
        res.status(200).json({ video_liked: false });
      }
    } else {
      res.status(500).json({
        error: "Server Error: Cannot check if video is in liked videos.",
      });
    }
  });
});

/**
 * Get weather a user disliked a video.
 *
 * @name User Disliked
 *
 * @route {GET} /users/inDislikedVideos
 *
 * @queryparam {String} [user_id] User's ID.
 * @queryparam {String} [video_id] Video ID.
 */
userRouter.get("/inDislikedVideos", (req, res) => {
  User.findOne({ _id: req.query.user_id }).then((user) => {
    // Check if user exists
    if (user) {
      if (user.disliked_videos.includes(req.query.video_id)) {
        res.status(200).json({ video_disliked: true });
      } else {
        res.status(200).json({ video_disliked: false });
      }
    } else {
      res.status(500).json({
        error: "Server Error: Cannot check if video is in disliked videos.",
      });
    }
  });
});

/**
 * Add a video to user's liked videos.
 *
 * @name User Like
 *
 * @route {POST} /users/addToLikedVideos
 *
 * @bodyparam {String} [user_id] User's ID.
 * @bodyparam {String} [video_id] Video ID.
 */
userRouter.post("/addToLikedVideos", (req, res) => {
  User.findOne({ _id: req.body.user_id }).then((user) => {
    // Check if user exists
    if (user) {
      User.updateOne(
        { _id: req.body.user_id },
        {
          $push: {
            liked_videos: req.body.video_id,
          },
        }
      ).then(res.json({ message: "Video added to liked videos!" }));
    } else {
      res
        .status(500)
        .json({ error: "Server Error: Cannot add video to liked videos." });
    }
  });
});

/**
 * Remove a video from user's liked videos.
 *
 * @name User Unlike
 *
 * @route {PUT} /users/removeFromLikedVideos
 *
 * @bodyparam {String} [user_id] User's ID.
 * @bodyparam {String} [video_id] Video ID.
 */
userRouter.put("/removeFromLikedVideos", (req, res) => {
  User.findOne({ _id: req.body.user_id }).then((user) => {
    // Check if user exists
    if (user) {
      User.updateOne(
        { _id: req.body.user_id },
        {
          $pull: {
            liked_videos: req.body.video_id,
          },
        }
      ).then(res.json({ message: "Video removed from liked videos!" }));
    } else {
      res
        .status(500)
        .json({ error: "Server Error: Cannot remove from liked videos." });
    }
  });
});

/**
 * Add a video to user's disliked videos.
 *
 * @name User Dislike
 *
 * @route {POST} /users/addToDislikedVideos
 *
 * @bodyparam {String} [user_id] User's ID.
 * @bodyparam {String} [video_id] Video ID.
 */
userRouter.post("/addToDislikedVideos", (req, res) => {
  User.findOne({ _id: req.body.user_id }).then((user) => {
    // Check if user exists
    if (user) {
      User.updateOne(
        { _id: req.body.user_id },
        {
          $push: {
            disliked_videos: req.body.video_id,
          },
        }
      ).then(res.json({ message: "Video added to disliked videos!" }));
    } else {
      res.status(500).json({ error: "Server Error: Cannot dislike video." });
    }
  });
});

/**
 * Remove a video from user's disliked videos.
 *
 * @name User Undislike
 *
 * @route {PUT} /users/removeFromDislikedVideos
 *
 * @bodyparam {String} [user_id] User's ID.
 * @bodyparam {String} [video_id] Video ID.
 */
userRouter.put("/removeFromDislikedVideos", (req, res) => {
  User.findOne({ _id: req.body.user_id }).then((user) => {
    // Check if user exists
    if (user) {
      User.updateOne(
        { _id: req.body.user_id },
        {
          $pull: {
            disliked_videos: req.body.video_id,
          },
        }
      ).then(res.json({ message: "Video removed from disliked videos!" }));
    } else {
      res
        .status(500)
        .json({ error: "Server Error: Cannot remove from disliked videos." });
    }
  });
});

module.exports = userRouter;
