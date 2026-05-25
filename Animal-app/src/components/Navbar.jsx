import React from "react";

const Navbar = () => {

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2e7d32",
    padding: "15px 40px",
    color: "white"
  };

  const navStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    fontSize: "16px"
  };

  const donateStyle = {
    backgroundColor: "#ff9800",
    border: "none",
    padding: "10px 18px",
    borderRadius: "5px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  };

  return (
    <header style={headerStyle}>

      <h2>Gaushala</h2>

      <nav style={navStyle}>
        <a href="#" style={linkStyle}>Home</a>
        <a href="#" style={linkStyle}>About Gaushala</a>
        <a href="#" style={linkStyle}>Cow Shelter</a>
        <a href="#" style={linkStyle}>Rescue Services</a>

        <button style={donateStyle}>Donate Now</button>

        <a href="#" style={linkStyle}>Organic Products</a>
        <a href="#" style={linkStyle}>Volunteer</a>
        <a href="#" style={linkStyle}>Contact</a>
      </nav>

    </header>
  );
};

export default Navbar;