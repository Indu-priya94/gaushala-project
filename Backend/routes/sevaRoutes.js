const express = require("express");
const router = express.Router();
const Seva = require("../models/Seva");

// Add Seva
router.post("/add", async (req, res) => {
  try {
    const newSeva = new Seva({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
    });

    await newSeva.save();
    res.json("Seva Added");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Sevas
router.get("/", async (req, res) => {
  try {
    const sevas = await Seva.find();
    res.json(sevas);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Seva
router.delete("/:id", async (req, res) => {
  try {
    await Seva.findByIdAndDelete(req.params.id);
    res.json("Seva Deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;