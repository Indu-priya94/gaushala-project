const express = require("express");
const router = express.Router();
const Founder = require("../models/Founder");

// Add Founder
router.post("/add", async (req, res) => {
  try {
    const newFounder = new Founder({
      name: req.body.name,
      role: req.body.role,
      description: req.body.description,
      image: req.body.image,
    });

    await newFounder.save();
    res.json("Founder Added");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Founders
router.get("/", async (req, res) => {
  try {
    const founders = await Founder.find();
    res.json(founders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Founder
router.delete("/:id", async (req, res) => {
  try {
    await Founder.findByIdAndDelete(req.params.id);
    res.json("Founder Deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;