const express = require("express");
const CourseDuration = require("../db/models/course_duration");
const auth = require("../middleware/auth");
const router = new express.Router();


router.post("/courseDurations/addCourseDuration", auth,async (req, res) => {
  const courseDuration = new CourseDuration({
    ...req.body,creator:req.user._id
  });
  try {
    await courseDuration.save();
    res.status(200).send(courseDuration);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get("/courseDurations",async (req, res) => {
  try {
     const courseDuration = await CourseDuration.find({});
    res.status(200).send(courseDuration);
  } catch (error) {
    res.status(400).send(e);
  }
});

module.exports= router;