import React, { useState } from "react";
import axios from "axios";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginAdmin = async () => {
    try {
      const res = await axios.post(
        "https://gaushala-project-60ok.onrender.com/admin/login",
        {
          username: username.trim(),
          password: password.trim(),
        }
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Success");

      window.location.href = "/";
    } catch (error) {
      alert("Wrong Username or Password");
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF8E7",
      }}
    >
      <div
        style={{
          width: "350px",
          backgroundColor: "white",
          padding: "35px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#2e7d32" }}>
          Admin Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
          }}
        />

        <button
          onClick={loginAdmin}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2e7d32",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;