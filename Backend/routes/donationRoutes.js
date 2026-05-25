const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");

// Add Donation
router.post("/add", async (req, res) => {
  try {
    const donation = new Donation({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      amount: req.body.amount,
      purpose: req.body.purpose,
    });

    await donation.save();
    res.json("Donation Submitted Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Donations
router.get("/", async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Donation
router.delete("/:id", async (req, res) => {
  try {
    await Donation.findByIdAndDelete(req.params.id);
    res.json("Donation Deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;