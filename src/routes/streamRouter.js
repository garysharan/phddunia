const express = require("express");
const Stream = require("../db/models/stream");
const auth = require("../middleware/auth");
const router = new express.Router();


router.post("/streams/addStream", auth,async (req, res) => {
  const stream = new Stream({
    ...req.body,creator:req.user._id
  });
  try {
    await stream.save();
    res.status(200).send(stream);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get("/streams",async (req, res) => {
  try {
     const streams = await Stream.find({});
    res.status(200).send(streams);
  } catch (error) {
    res.status(400).send(e);
  }
});

module.exports= router;