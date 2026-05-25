import React, { useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Header from "./components/Header";
import Slider from "./components/Slider";
import Donatesection from "./components/Donatesection";
import FeatureBoxes from "./components/FeatureBoxes";
import Footer from "./components/Footer";

import CowServices from "./pages/Cowservices";
import AdoptCow from "./pages/Adoptcow";
import Gallery from "./pages/Gallery";
import AdminLogin from "./pages/AdminLogin";
import DonationHistory from "./pages/DonationHistory";

import SevaSection from "./components/Sevasection";
import Achievements from "./components/Achievements";
import AboutOwner from "./components/AboutOwner";

function App() {

  useEffect(() => {

    axios
      .get("http://localhost:5000")
      .then((res) => {
        console.log(res.data);
      });

  }, []);

  return (
    <Router>

      {/* Header */}
      <Header />

      {/* Routes */}
      <Routes>

        <Route
          path="/"
          element={
            <>
              <Slider />
              <Donatesection />
              <FeatureBoxes />
              <SevaSection />
              <Achievements />
              <AboutOwner />
            </>
          }
        />

        <Route
          path="/cow-services"
          element={<CowServices />}
        />

        <Route
          path="/adopt-cow"
          element={<AdoptCow />}
        />

        <Route
          path="/gallery"
          element={<Gallery />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/donation-history"
          element={<DonationHistory />}
        />

      </Routes>

      {/* Footer */}
      <Footer />

    </Router>
  );
}

export default App;