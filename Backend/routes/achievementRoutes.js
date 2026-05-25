const express = require("express");
const router = express.Router();
const Achievement = require("../models/Achievement");

// Add Achievement
router.post("/add", async (req, res) => {
  try {
    const newAchievement = new Achievement({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
    });

    await newAchievement.save();
    res.json("Achievement Added");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Achievements
router.get("/", async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.json(achievements);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Achievement
router.delete("/:id", async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json("Achievement Deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;