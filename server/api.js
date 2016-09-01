const {createReadStream} = require("fs");
const express = require("express");
const glob = require("glob-promise");
const router = express.Router();

const sounds = glob("src/sounds/**/*.mp3").then((sounds) => {
  return sounds.map((sound) => sound.replace("src/sounds/", "").replace(/\.mp3$/, ""));
});

router.get("/foo", (req, res) => {
  res.send("bar");
});

router.get("/sounds", (req, res) => {
  sounds.then(
    (sounds) => res.json({sounds}),
    (error) => res.status(400).send(error.toString())
  );
});

router.get("/sound/*", (req, res) => {
  const path = req.params[0];
  if(!path.length) {
    res.status(400).send();
    return;
  }
  res.setHeader("content-type", "audio-mpeg");
  createReadStream(`src/sounds/${path}.mp3`).pipe(res);
});

module.exports = router;
