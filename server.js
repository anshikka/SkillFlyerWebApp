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

/** @module api/ */

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(express.static('./client/build'));

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/topics", topics);
app.use("/api/subtopics", subtopics);
app.use("/api/videos", videos);
app.use("/api/folders", folders);
app.use(function(req, res) {
	res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Port config for deployment
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Skillflyer Server up and running on port ${port} !`)
);
