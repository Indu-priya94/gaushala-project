import React, {
  useEffect,
  useState,
  useContext,
} from "react";

import axios from "axios";

import { LanguageContext } from "../LanguageContext";

function AboutOwner() {

  const token = localStorage.getItem("token");

  const { t } = useContext(LanguageContext);

  const [founders, setFounders] = useState([]);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // Fetch Founders
  const fetchFounders = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/founder"
      );

      setFounders(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchFounders();

  }, []);

  // Add Founder
  const addFounder = async () => {

    if (
      !name ||
      !role ||
      !description ||
      !image
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      await axios.post(
        "http://localhost:5000/founder/add",
        {
          name,
          role,
          description,
          image,
        }
      );

      setName("");
      setRole("");
      setDescription("");
      setImage("");

      fetchFounders();

    } catch (error) {

      console.log(error);

    }
  };

  // Delete Founder
  const deleteFounder = async (id) => {

    const confirmDelete = window.confirm(
      "Do you want to delete this founder?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5000/founder/${id}`
      );

      fetchFounders();

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div
      style={{
        padding: "50px",
        background: "#FFF8E7",
        minHeight: "100vh",
      }}
    >
      {/* Heading */}
      <h1
        style={{
          textAlign: "center",
          color: "green",
          marginBottom: "30px",
        }}
      >
        {t.founders}
      </h1>

      {/* Admin Add Form */}
      {token && (
        <div
          style={{
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          <input
            placeholder="Founder Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          />

          <input
            placeholder="Role"
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          />

          <input
            placeholder="Image URL"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            style={{
              padding: "10px",
              marginRight: "10px",
              width: "300px",
            }}
          />

          <button
            onClick={addFounder}
            style={{
              background: "green",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Add Founder
          </button>
        </div>
      )}

      {/* Founder Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3,1fr)",
          gap: "20px",
        }}
      >
        {founders.map((founder) => (
          <div
            key={founder._id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              boxShadow:
                "0px 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={founder.image}
              alt={founder.name}
              style={{
                width: "100%",
                height: "260px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            <h2
              style={{
                color: "green",
              }}
            >
              {founder.name}
            </h2>

            <h4
              style={{
                color: "orange",
              }}
            >
              {founder.role}
            </h4>

            <p>
              {founder.description}
            </p>

            {token && (
              <button
                onClick={() =>
                  deleteFounder(
                    founder._id
                  )
                }
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

export default AboutOwner;