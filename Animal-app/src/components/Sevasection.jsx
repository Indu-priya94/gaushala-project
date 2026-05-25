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
    const res = await axios.get("http://https://gaushala-project-600k.onrender.com/seva");
    setSevas(res.data);
  };

  const fetchBookings = async () => {
    const res = await axios.get("http://https://gaushala-project-600k.onrender.com/seva-booking");
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

    await axios.post("http://https://gaushala-project-600k.onrender.com/seva/add", {
      title,
      description,
      image,
    });

    setTitle("");
    setDescription("");
    setImage("");
    fetchSevas();
  };

  const deleteSeva = async (id) => {
    const confirmDelete = window.confirm("Do you want to delete this seva?");
    if (!confirmDelete) return;

    await axios.delete(`http://https://gaushala-project-600k.onrender.com/seva/${id}`);
    setCurrent(0);
    fetchSevas();
  };

  const bookSeva = async () => {
    if (!userName || !phone || !email || !date) {
      alert("Please fill all required details");
      return;
    }

    await axios.post("http://https://gaushala-project-600k.onrender.com/seva-booking/add", {
      name: userName,
      phone,
      email,
      sevaName: sevas[current]?.title,
      date,
      message,
    });

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
    const confirmDelete = window.confirm("Do you want to delete this booking?");
    if (!confirmDelete) return;

    await axios.delete(`http://https://gaushala-project-600k.onrender.com/seva-booking/${id}`);
    fetchBookings();
  };

  const seva = sevas[current];

  return (
    <div style={{ background: "#FFF8E7", padding: "60px" }}>
      <h1 style={{ textAlign: "center", color: "green", marginBottom: "30px" }}>
        {t.seva}
      </h1>

      {token && (
        <div style={{ marginBottom: "30px" }}>
          <input
            placeholder="Seva Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: "10px", marginRight: "10px" }}
          />

          <input
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={{ padding: "10px", marginRight: "10px" }}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: "10px", marginRight: "10px", width: "300px" }}
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
          }}
        >
          <div style={{ width: "50%" }}>
            <h2 style={{ fontSize: "30px" }}>{seva.title}</h2>

            <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
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
        <p style={{ textAlign: "center" }}>No Sevas Added</p>
      )}

      {showForm && (
        <div
          style={{
            marginTop: "30px",
            background: "white",
            padding: "25px",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        >
          <h2>Book Seva: {seva?.title}</h2>

          <input
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{ padding: "10px", marginRight: "10px" }}
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ padding: "10px", marginRight: "10px" }}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "10px", marginRight: "10px" }}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ padding: "10px", marginRight: "10px" }}
          />

          <input
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ padding: "10px", marginRight: "10px", marginTop: "10px" }}
          />

          <button
            onClick={bookSeva}
            style={{
              background: "green",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              marginTop: "10px",
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
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {token && (
        <div style={{ marginTop: "40px", background: "white", padding: "20px" }}>
          <h2 style={{ color: "green" }}>Seva Bookings</h2>

          {bookings.map((booking) => (
            <div
              key={booking._id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            >
              <p><b>Name:</b> {booking.name}</p>
              <p><b>Phone:</b> {booking.phone}</p>
              <p><b>Email:</b> {booking.email}</p>
              <p><b>Seva:</b> {booking.sevaName}</p>
              <p><b>Date:</b> {booking.date}</p>
              <p><b>Message:</b> {booking.message}</p>

              <button
                onClick={() => deleteBooking(booking._id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  cursor: "pointer",
                }}
              >
                Delete Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SevaSection;