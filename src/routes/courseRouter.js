const express = require("express");
const Course = require("../db/models/course");
const Stream = require("../db/models/stream");
const CourseDuration = require("../db/models/course_duration");
const auth = require("../middleware/auth");
const router = new express.Router();


router.post("/courses/addCourse", auth, async (req, res) => {
  const stream = await Stream.findOne({name:req.body.stream});
  const courseDuration = await CourseDuration.findOne({name:req.body.course_duration});
  console.log(stream._id);
  console.log(courseDuration._id);
  const course = new Course({
    ...req.body,streamID:stream._id,courseDurationID:courseDuration._id,creator:req.user._id
  });
  try {
    await course.save();
    res.status(200).send(course);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});


router.get("/courses",async (req, res) => {
  try {
     const courses = await Course.find({});
    res.status(200).send(courses);
  } catch (error) {
    res.status(400).send(e);
  }
});

module.exports= router;