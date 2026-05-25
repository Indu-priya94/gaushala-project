import React, {
  useEffect,
  useState,
  useContext,
} from "react";

import axios from "axios";
import { LanguageContext } from "../LanguageContext";

function CowServices() {
  const token = localStorage.getItem("token");
  const { t } = useContext(LanguageContext);

  const [services, setServices] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const fetchServices = async () => {
    const res = await axios.get("http://https://gaushala-project-600k.onrender.com/cow-service");
    setServices(res.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const addService = async () => {
    if (!title || !description || !image) {
      alert("Please fill all fields");
      return;
    }

    await axios.post("http://https://gaushala-project-600k.onrender.com/cow-service/add", {
      title,
      description,
      image,
    });

    setTitle("");
    setDescription("");
    setImage("");

    fetchServices();
  };

  const deleteService = async (id) => {
    const confirmDelete = window.confirm(
      "Do you want to delete this service?"
    );

    if (!confirmDelete) return;

    await axios.delete(`http://https://gaushala-project-600k.onrender.com/cow-service/${id}`);

    fetchServices();
  };

  return (
    <div
      style={{
        padding: "50px",
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
        {t.services}
      </h1>

      {token && (
        <div
          style={{
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          <input
            placeholder="Service Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          />

          <input
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              padding: "10px",
              marginRight: "10px",
              width: "300px",
            }}
          />

          <button
            onClick={addService}
            style={{
              background: "green",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Add Service
          </button>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
        }}
      >
        {services.map((item) => (
          <div
            key={item._id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            <h2 style={{ color: "green" }}>{item.title}</h2>

            <p>{item.description}</p>

            {token && (
              <button
                onClick={() => deleteService(item._id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "10px",
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

export default CowServices;