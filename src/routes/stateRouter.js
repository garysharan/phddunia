const express = require("express");
const State = require("../db/models/state");
const Country = require("../db/models/country");
const auth = require("../middleware/auth");
const router = new express.Router();


router.post("/states/addState", auth, async (req, res) => {
  const country = await Country.findOne({ name: req.body.countryName });
  
  const state = new State({
    ...req.body,countryID:country._id,creator:req.user._id
  });
  // console.log(country._id);
  try {
    await state.save();
    res.status(200).send(state);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/states",async (req, res) => {
  try {
     const states = await State.find({});
    res.status(200).send(states);
  } catch (error) {
    res.status(400).send(e);
  }
});

module.exports= router;