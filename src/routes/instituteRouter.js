/** @format */

const express = require("express");
const Category = require("../db/models/category");
const City = require("../db/models/city");
const State = require("../db/models/state");
const Institute = require("../db/models/institute");
const Course = require("../db/models/course");
const Stream = require("../db/models/stream");
const auth = require("../middleware/auth");
const router = new express.Router();
const multer = require("multer");
const CourseDuration = require("../db/models/course_duration");
const { ObjectId } = require("mongodb");

const upload = multer({
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (
      file.originalname.endsWith(".jpg") ||
      file.originalname.endsWith(".png") ||
      file.originalname.endsWith(".JPG") ||
      file.originalname.endsWith(".PNG") ||
      file.originalname.endsWith(".JPEG") ||
      file.originalname.endsWith(".jpeg")
    ) {
      cb(undefined, true);
    } else {
      return cb(new Error("File must be an image"));
    }
  },
});

router.post(
  "/institutes/uploadLogo",
  upload.single("logo"),
  async (req, res) => {
    const institute = await Institute.findOne({
      shortname: req.body.shortname,
    });
    console.log("Logo file buffer", req.file.buffer);
    institute.logo = req.file.buffer;
    try {
      await institute.save();
      res.status(200).send({
        message: "Logo uploaded successfully",
      });
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.post(
  "/institutes/uploadBanner",
  upload.single("banner"),
  async (req, res) => {
    const institute = await Institute.findOne({
      shortname: req.body.shortname,
    });
    console.log("Banner file buffer", req.file.buffer);
    institute.banner = req.file.buffer;
    try {
      await institute.save();
      res.status(200).send({
        message: "Banner uploaded successfully",
      });
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.post("/institutes/addInstitute", auth, async (req, res) => {
  console.log(req.body);
  const city = await City.findOne({
    name: req.body.city,
  });
  const state = await State.findOne({
    _id: city.stateID,
  });
  const institute = new Institute({
    ...req.body,
    state: state.name,
    creator: req.user._id,
  });
  try {
    await institute.save();
    res.status(200).send(institute);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

router.post("/institutes/getInstituteDetail", async (req, res) => {
  try {
    if (!req.body.id) {
      throw new Error();
    }
    const institute = await Institute.findOne({
      _id: req.body.id,
    });
    if (!institute) {
      throw new Error();
    }
    res.status(200).send(institute);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/institutes/addCourseToInstitute", auth, async (req, res) => {
  const institute = await Institute.findOne({
    name: req.body.institute,
  });

  const course = await Course.findOne({
    name: req.body.course_name,
  });
  console.log(course);
  const course_duration = await CourseDuration.findOne({
    _id: course.courseDurationID,
  });

  const stream = await Stream.findOne({
    _id: course.streamID,
  });
  institute.courses = institute.courses.concat({
    course_shortname: course.shortname,
    course_name: course.name,
    course_desc: course.desc,
    semester_fee: req.body.semester_fee,
    exam_fee: req.body.exam_fee,
    registration_fee: req.body.registration_fee,
    total_fee: req.body.total_fee,
    eligibility: course.eligibility,
    stream: stream.name,
    courseDuration: course_duration.name,
  });

  try {
    await institute.save();
    res.status(200).send(institute);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get("/institutes", async (req, res) => {
  try {
    const institutes = await Institute.find({});
    res.status(200).send(institutes);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/institutes/:id/logo", async (req, res) => {
  try {
    const institute = await Institute.findById(req.params.id);
    if (!institute || !institute.logo) {
      throw new Error();
    }
    res.set("Content-Type", "image/jpg");
    res.send(institute.logo);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/institutes/:id/banner", async (req, res) => {
  try {
    const institute = await Institute.findById(req.params.id);
    if (!institute || !institute.banner) {
      throw new Error();
    }
    res.set("Content-Type", "image/jpg");
    res.send(institute.banner);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete("/institutes/delete", async (req, res) => {
  const institute = await Institute.findOne({
    shortname: req.body.institute.shortname,
  });
  try {
    const institutes = await Institute.deleteOne(institute);
    res.status(200).send(institutes);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
