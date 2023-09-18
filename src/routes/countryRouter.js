const express = require("express");
const Country = require("../db/models/country");
const auth = require("../middleware/auth");
const router = new express.Router();


router.post("/countries/addCountry", auth, async (req, res) => {
  
  const country = new Country({
    ...req.body,creator:req.user._id
  });
  try {
    await country.save();
    res.status(200).send(country);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get("/countries",async (req, res) => {
  try {
     const countries = await Country.find({});
    res.status(200).send(countries);
  } catch (error) {
    res.status(400).send(e);
  }
});

module.exports= router;