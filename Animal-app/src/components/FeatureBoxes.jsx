import React from "react";
import { useNavigate } from "react-router-dom";

import whatwedo from "../assets/whatwedo.jpg";
import adoptcow from "../assets/adoptcow.jpg";
import gallery from "../assets/gallery.jpg";

function FeatureBoxes() {

  const navigate = useNavigate();

  const container = {
    display: "flex",
    justifyContent: "space-around",
    padding: "60px",
    backgroundColor: "#FFF8E7"
  };

  const box = {
    width: "30%",
    backgroundColor: "white",
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0px 3px 10px rgba(0,0,0,0.1)"
  };

  const img = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px"
  };

  return (
    <div style={container}>

      <div style={box} onClick={() => navigate("/cow-services")}>
        <h3>What We Do For Cows</h3>
        <img src={whatwedo} alt="Cow Services" style={img} />
      </div>

      <div style={box} onClick={() => navigate("/adopt-cow")}>
        <h3>Adopt a Cow</h3>
        <img src={adoptcow} alt="Adopt Cow" style={img} />
      </div>

      <div style={box} onClick={() => navigate("/gallery")}>
        <h3>Gallery</h3>
        <img src={gallery} alt="Gallery" style={img} />
      </div>

    </div>
  );
}

export default FeatureBoxes;