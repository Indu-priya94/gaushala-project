import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LanguageContext } from "../LanguageContext";

function Donatesection() {

  const token = localStorage.getItem("token");

  const { t } = useContext(LanguageContext);

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");

  const submitDonation = async () => {

    if (
      !name ||
      !phone ||
      !email ||
      !amount ||
      !purpose
    ) {
      alert("Please fill all details");
      return;
    }

    await axios.post(
      "http://https://gaushala-project-600k.onrender.com/donation/add",
      {
        name,
        phone,
        email,
        amount,
        purpose,
      }
    );

    alert(
      "Donation request submitted successfully"
    );

    setName("");
    setPhone("");
    setEmail("");
    setAmount("");
    setPurpose("");

    setShowForm(false);
  };

  return (
    <div
      style={{
        background: "#FFF8E7",
        padding: "50px",
        textAlign: "center",
      }}
    >
      {/* Heading */}
      <h1
        style={{
          color: "green",
        }}
      >
        {t.donate}
      </h1>

      <p>
        Your donation helps us provide
        food, shelter and medical care
        for cows.
      </p>

      {/* Donate Button */}
      <button
        onClick={() => setShowForm(true)}
        style={{
          background: "orange",
          color: "white",
          border: "none",
          padding: "12px 25px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {t.donate}
      </button>

      {/* Admin History */}
      {token && (
        <Link to="/donation-history">
          <button
            style={{
              marginLeft: "15px",
              background: "green",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            View Transaction History
          </button>
        </Link>
      )}

      {/* Donation Form */}
      {showForm && (
        <div
          style={{
            margin: "30px auto 0",
            background: "white",
            padding: "25px",
            borderRadius: "10px",
            maxWidth: "450px",
            border: "1px solid #ddd",
          }}
        >
          <h2
            style={{
              color: "green",
            }}
          >
            Donation Details
          </h2>

          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <select
            value={purpose}
            onChange={(e) =>
              setPurpose(e.target.value)
            }
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
            }}
          >
            <option value="">
              Select Purpose
            </option>

            <option value="Cow Food">
              Cow Food
            </option>

            <option value="Medical Care">
              Medical Care
            </option>

            <option value="Shelter Support">
              Shelter Support
            </option>

            <option value="General Donation">
              General Donation
            </option>
          </select>

          {/* Dummy QR */}
          <h3>Scan Dummy QR</h3>

          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=DEMO_DONATION_QR_INVALID"
            alt="Dummy QR"
            style={{
              marginBottom: "10px",
            }}
          />

          <p
            style={{
              color: "red",
              fontSize: "14px",
            }}
          >
            Demo QR only. Real payment
            will not happen.
          </p>

          {/* Submit */}
          <button
            onClick={submitDonation}
            style={{
              background: "green",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Submit Donation
          </button>

          {/* Cancel */}
          <button
            onClick={() =>
              setShowForm(false)
            }
            style={{
              marginLeft: "10px",
              background: "gray",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default Donatesection;