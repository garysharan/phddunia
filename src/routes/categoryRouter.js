const express = require("express");
const Category = require("../db/models/category");
const auth = require("../middleware/auth");
const router = new express.Router();


router.post("/categories/addCategory", auth,async (req, res) => {
  const category = new Category({
    ...req.body,creator:req.user._id
  });
  try {
    await category.save();
    res.status(200).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get("/categories",async (req, res) => {
  try {
     const categories = await Category.find({});
    res.status(200).send(categories);
  } catch (error) {
    res.status(400).send(e);
  }
});

module.exports= router;