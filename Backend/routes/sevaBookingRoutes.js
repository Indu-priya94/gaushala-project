const express = require("express");
const router = express.Router();
const SevaBooking = require("../models/SevaBooking");

// Add Booking
router.post("/add", async (req, res) => {
  try {
    const booking = new SevaBooking({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      sevaName: req.body.sevaName,
      date: req.body.date,
      message: req.body.message,
    });

    await booking.save();
    res.json("Seva Booking Added");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await SevaBooking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Booking
router.delete("/:id", async (req, res) => {
  try {
    await SevaBooking.findByIdAndDelete(req.params.id);
    res.json("Booking Deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;