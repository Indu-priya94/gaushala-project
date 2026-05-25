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

  useEffect(() => {
    fetchSevas();
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
      alert("Please fill all fields");
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
    await axios.delete(
      `https://gaushala-project-60ok.onrender.com/seva/${id}`
    );

    fetchSevas();
  };

  const bookSeva = async () => {
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
  };

  const seva = sevas[current];

  return (
    <div
      style={{
        background: "#FFF8E7",
        padding: "60px 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "green",
          marginBottom: "30px",
          fontSize: "50px",
        }}
      >
        {t.seva}
      </h1>

      {token && (
        <div
          style={{
            marginBottom: "30px",
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
            style={{ padding: "10px" }}
          />

          <input
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={{ padding: "10px" }}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              padding: "10px",
              width: "300px",
            }}
          />

          <button
            onClick={addSeva}
            style={{
              padding: "10px 20px",
              background: "green",
              color: "white",
              border: "none",
              cursor: "pointer",
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
            borderRadius: "10px",
            padding: "40px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          <div style={{ width: "50%" }}>
            <h2
              style={{
                fontSize: "30px",
                marginBottom: "20px",
              }}
            >
              {seva.title}
            </h2>

            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.6",
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
                padding: "12px 25px",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "20px",
              }}
            >
              Book Now
            </button>

            {token && (
              <button
                onClick={() => deleteSeva(seva._id)}
                style={{
                  marginLeft: "10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "12px 25px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "20px",
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
              width: "380px",
              height: "260px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>
          No Sevas Added
        </p>
      )}

      {showForm && (
        <div
          style={{
            marginTop: "30px",
            background: "white",
            padding: "25px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            maxWidth: "900px",
            marginInline: "auto",
          }}
        >
          <h2>Book Seva: {seva?.title}</h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <input
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{ padding: "10px" }}
            />

            <input
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ padding: "10px" }}
            />

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: "10px" }}
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ padding: "10px" }}
            />

            <input
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ padding: "10px", width: "300px" }}
            />
          </div>

          <button
            onClick={bookSeva}
            style={{
              background: "green",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              marginTop: "20px",
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
              padding: "10px 20px",
              cursor: "pointer",
              marginLeft: "10px",
              marginTop: "20px",
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