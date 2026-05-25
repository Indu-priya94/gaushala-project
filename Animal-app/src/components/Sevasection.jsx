import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { LanguageContext } from "../LanguageContext";

function SevaSection() {
  const token = localStorage.getItem("token");
  const { t } = useContext(LanguageContext);

  const [sevas, setSevas] = useState([]);
  const [current, setCurrent] = useState(0);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [bookings, setBookings] = useState([]);

  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const fetchSevas = async () => {
    const res = await axios.get(
      "https://gaushala-project-60ok.onrender.com/seva"
    );
    setSevas(res.data);
  };

  const fetchBookings = async () => {
    const res = await axios.get(
      "https://gaushala-project-60ok.onrender.com/seva-booking"
    );
    setBookings(res.data);
  };

  useEffect(() => {
    fetchSevas();
    fetchBookings();
  }, []);

  useEffect(() => {
    if (sevas.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sevas.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [sevas]);

  const addSeva = async () => {
    if (!title || !description || !image) {
      alert("Please fill all seva fields");
      return;
    }

    await axios.post(
      "https://gaushala-project-60ok.onrender.com/seva/add",
      {
        title,
        description,
        image,
      }
    );

    setTitle("");
    setDescription("");
    setImage("");
    fetchSevas();
  };

  const deleteSeva = async (id) => {
    const confirmDelete = window.confirm(
      "Do you want to delete this seva?"
    );

    if (!confirmDelete) return;

    await axios.delete(
      `https://gaushala-project-60ok.onrender.com/seva/${id}`
    );

    setCurrent(0);
    fetchSevas();
  };

  const bookSeva = async () => {
    if (!userName || !phone || !email || !date) {
      alert("Please fill all required details");
      return;
    }

    await axios.post(
      "https://gaushala-project-60ok.onrender.com/seva-booking/add",
      {
        name: userName,
        phone,
        email,
        sevaName: sevas[current]?.title,
        date,
        message,
      }
    );

    alert("Seva Booked Successfully");

    setUserName("");
    setPhone("");
    setEmail("");
    setDate("");
    setMessage("");
    setShowForm(false);

    fetchBookings();
  };

  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm(
      "Do you want to delete this booking?"
    );

    if (!confirmDelete) return;

    await axios.delete(
      `https://gaushala-project-60ok.onrender.com/seva-booking/${id}`
    );

    fetchBookings();
  };

  const seva = sevas[current];

  return (
    <div
      style={{
        background: "#FFF8E7",
        padding: "80px 30px",
        width: "100%",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "green",
          marginBottom: "40px",
          fontSize: "60px",
        }}
      >
        {t.seva}
      </h1>

      {token && (
        <div
          style={{
            marginBottom: "40px",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <input
            placeholder="Seva Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: "12px" }}
          />

          <input
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={{ padding: "12px" }}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              padding: "12px",
              width: "350px",
            }}
          />

          <button
            onClick={addSeva}
            style={{
              padding: "12px 24px",
              background: "green",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Add Seva
          </button>
        </div>
      )}

      {seva ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "15px",
            padding: "70px",
            boxShadow: "0px 2px 15px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "1900px",
            margin: "auto",
            gap: "70px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: "350px",
            }}
          >
            <h2
              style={{
                fontSize: "65px",
                marginBottom: "30px",
                color: "#111",
              }}
            >
              {seva.title}
            </h2>

            <p
              style={{
                fontSize: "30px",
                lineHeight: "1.8",
                color: "#555",
              }}
            >
              {seva.description}
            </p>

            <button
              onClick={() => setShowForm(true)}
              style={{
                background: "orange",
                color: "white",
                border: "none",
                padding: "16px 35px",
                borderRadius: "6px",
                cursor: "pointer",
                marginTop: "30px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Book Now
            </button>

            {token && (
              <button
                onClick={() => deleteSeva(seva._id)}
                style={{
                  marginLeft: "15px",
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "16px 35px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginTop: "30px",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Delete Seva
              </button>
            )}
          </div>

          <img
            src={seva.image}
            alt={seva.title}
            style={{
              width: "100%",
              maxWidth: "750px",
              height: "480px",
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />
        </div>
      ) : (
        <p
          style={{
            textAlign: "center",
            fontSize: "25px",
          }}
        >
          No Sevas Added
        </p>
      )}

      {showForm && (
        <div
          style={{
            marginTop: "40px",
            background: "white",
            padding: "30px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            maxWidth: "1100px",
            marginInline: "auto",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            Book Seva: {seva?.title}
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <input
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{ padding: "12px" }}
            />

            <input
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ padding: "12px" }}
            />

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: "12px" }}
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ padding: "12px" }}
            />

            <input
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                padding: "12px",
                width: "350px",
              }}
            />
          </div>

          <button
            onClick={bookSeva}
            style={{
              background: "green",
              color: "white",
              border: "none",
              padding: "12px 25px",
              cursor: "pointer",
              marginTop: "25px",
              borderRadius: "5px",
            }}
          >
            Submit Booking
          </button>

          <button
            onClick={() => setShowForm(false)}
            style={{
              background: "gray",
              color: "white",
              border: "none",
              padding: "12px 25px",
              cursor: "pointer",
              marginLeft: "10px",
              marginTop: "25px",
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

export default SevaSection;