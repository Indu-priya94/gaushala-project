const express = require("express");
const router = express.Router();
const CowService = require("../models/CowService");

// Add Service
router.post("/add", async (req, res) => {
  try {
    const newService = new CowService({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
    });

    await newService.save();

    res.json("Service Added");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Services
router.get("/", async (req, res) => {
  try {
    const services = await CowService.find();

    res.json(services);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Service
router.delete("/:id", async (req, res) => {
  try {
    await CowService.findByIdAndDelete(req.params.id);

    res.json("Service Deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;