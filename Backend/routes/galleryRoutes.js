const express = require("express");
const router = express.Router();

const Gallery = require("../models/Gallery");

router.post("/add", async (req, res) => {
  try {
    const newImage = new Gallery({
      image: req.body.image,
    });

    await newImage.save();

    res.status(200).json("Image Added");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;