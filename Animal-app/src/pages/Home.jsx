import React from "react";
import bgImage from "../assets/bg1.jpg";

const Home = () => {

  const homeStyle = {
    backgroundImage: `url(${bgImage})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  const donateButtonStyle = {
    padding: "15px 30px",
    fontSize: "20px",
    backgroundColor: "#ff9800",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  };

  return (
    <div style={homeStyle}>
      <button style={donateButtonStyle}>
        Donate Now
      </button>
    </div>
  );
};

export default Home;