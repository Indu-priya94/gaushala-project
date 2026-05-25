import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { LanguageContext } from "../LanguageContext";

function Achievements() {
  const token = localStorage.getItem("token");
  const { t } = useContext(LanguageContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [achievements, setAchievements] = useState([]);

  const fetchAchievements = async () => {
    const res = await axios.get("http://https://gaushala-project-60ok.onrender.com/achievement");
    setAchievements(res.data);
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const addAchievement = async () => {
    await axios.post("http://https://gaushala-project-60ok.onrender.com/achievement/add", {
      title,
      description,
      image,
    });

    setTitle("");
    setDescription("");
    setImage("");
    fetchAchievements();
  };

  const deleteAchievement = async (id) => {
    const confirmDelete = window.confirm(
      "Do you want to delete this achievement?"
    );

    if (!confirmDelete) return;

    await axios.delete(`http://https://gaushala-project-60ok.onrender.com/achievement/${id}`);
    fetchAchievements();
  };

  return (
    <div style={{ padding: "50px", background: "#f5f5dc" }}>
      <h1 style={{ textAlign: "center", color: "green", marginBottom: "40px" }}>
        {t.achievements}
      </h1>

      {token && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "40px" }}>
          <input
            type="text"
            placeholder="Achievement Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: "10px" }}
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={{ padding: "10px" }}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: "10px" }}
          />

          <button
            onClick={addAchievement}
            style={{
              background: "green",
              color: "white",
              border: "none",
              padding: "12px",
              cursor: "pointer",
            }}
          >
            Add Achievement
          </button>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "25px" }}>
        {achievements.map((item) => (
          <div
            key={item._id}
            style={{
              background: "white",
              border: "2px solid orange",
              borderRadius: "20px",
              overflow: "hidden",
              textAlign: "center",
              paddingBottom: "20px",
            }}
          >
            <img
              src={item.image}
              alt=""
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />

            <h2 style={{ color: "#ff5a1f", marginTop: "20px" }}>
              {item.title}
            </h2>

            <p style={{ color: "#666", padding: "0 20px", lineHeight: "1.6" }}>
              {item.description}
            </p>

            <button
              style={{
                background: "none",
                border: "none",
                color: "#ff5a1f",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              Read More
            </button>

            {token && (
              <button
                onClick={() => deleteAchievement(item._id)}
                style={{
                  display: "block",
                  margin: "15px auto 0",
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Achievements;