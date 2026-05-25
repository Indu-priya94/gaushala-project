require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const galleryRoutes = require("./routes/galleryRoutes");
const adminRoutes = require("./routes/adminRoutes");
const sevaRoutes = require("./routes/sevaRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const cowRoutes = require("./routes/cowRoutes");
const cowServiceRoutes = require("./routes/cowServiceRoutes");
const founderRoutes = require("./routes/founderRoutes");
const sevaBookingRoutes = require("./routes/sevaBookingRoutes");
const donationRoutes = require("./routes/donationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/admin", adminRoutes);
app.use("/gallery", galleryRoutes);
app.use("/seva", sevaRoutes);
app.use("/achievement", achievementRoutes);
app.use("/cow", cowRoutes);
app.use("/cow-service", cowServiceRoutes);
app.use("/founder", founderRoutes);
app.use("/seva-booking", sevaBookingRoutes);
app.use("/donation", donationRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

// Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});