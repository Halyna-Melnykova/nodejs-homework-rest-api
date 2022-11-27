const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
// require("dotenv").config()

const usersRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");

const Jimp = require("jimp");

// open a file
Jimp.read("./temp/cat.jpg", (err, cat) => {
  if (err) throw err;
  cat
    .resize(250, 250) // resize
    .quality(75) // set JPEG quality
    .greyscale() // set greyscale
    .write("./temp/avatar.jpg"); // save
});

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({
    message,
  });
});

module.exports = app;
