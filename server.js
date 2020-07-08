const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const users = require("./routes/api/users");
const topics = require("./routes/api/topics");
const subtopics = require("./routes/api/subtopics");
const videos = require("./routes/api/videos");
const folders = require("./routes/api/folders");
const Video = require("./models/Video");
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

app.get("/api/videos/:_id", (req, res) => {
  const video_id = req.params._id;
  // Find video by id
  Video.findOne({ _id: video_id }).then((video) => {
    // Check if video exists
    if (video) {
      return res.status(200).json(video);
    } else {
      return res.status(404).json({ message: "Video not found" });
    }
  });
});
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/topics", topics);
app.use("/api/subtopics", subtopics);
app.use("/api/videos", videos);
app.use("/api/folders", folders)



const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () =>
  console.log(`Skillflyer Server up and running on port ${port} !`)
);


