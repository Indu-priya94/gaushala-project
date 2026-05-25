const express = require("express");
const router = express.Router();
const Cow = require("../models/Cow");

// Add Cow
router.post("/add", async (req, res) => {
  try {
    const newCow = new Cow({
      name: req.body.name,
      dob: req.body.dob,
      gender: req.body.gender,
      breed: req.body.breed,
      health: req.body.health,
      image: req.body.image,
    });

    await newCow.save();
    res.json("Cow Added");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Cows
router.get("/", async (req, res) => {
  try {
    const cows = await Cow.find();
    res.json(cows);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Cow
router.delete("/:id", async (req, res) => {
  try {
    await Cow.findByIdAndDelete(req.params.id);
    res.json("Cow Deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;