import React, { useEffect, useState } from "react";
import axios from "axios";

function DonationHistory() {
  const [donations, setDonations] = useState([]);

  const fetchDonations = async () => {
    const res = await axios.get("https://gaushala-project-60ok.onrender.com/donation");
    setDonations(res.data);
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const deleteDonation = async (id) => {
    const confirmDelete = window.confirm(
      "Do you want to delete this donation?"
    );

    if (!confirmDelete) return;

    await axios.delete(`https://gaushala-project-60ok.onrender.com/donation/${id}`);
    fetchDonations();
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#FFF8E7",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "green",
          marginBottom: "30px",
        }}
      >
        Donation Transaction History
      </h1>

      {donations.map((item) => (
        <div
          key={item._id}
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px",
            border: "1px solid #ddd",
          }}
        >
          <p><b>Name:</b> {item.name}</p>
          <p><b>Phone:</b> {item.phone}</p>
          <p><b>Email:</b> {item.email}</p>
          <p><b>Amount:</b> ₹{item.amount}</p>
          <p><b>Purpose:</b> {item.purpose}</p>
          <p><b>Status:</b> {item.status}</p>

          <button
            onClick={() => deleteDonation(item._id)}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default DonationHistory;