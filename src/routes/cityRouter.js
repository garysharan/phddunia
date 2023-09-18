const express = require("express");
const City = require("../db/models/city");
const State = require("../db/models/state");
const auth = require("../middleware/auth");
const router = new express.Router();


router.post("/cities/addCity", auth, async (req, res) => {
  const state = await State.findOne({ name: req.body.state});
  const city = new City({
    ...req.body,stateID:state._id,creator:req.user._id
  });
  try {
    await city.save();
    res.status(200).send(city);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/cities",async (req, res) => {
  try {
     const cities = await City.find({});
    res.status(200).send(cities);
  } catch (error) {
    res.status(400).send(e);
  }
});

module.exports= router;