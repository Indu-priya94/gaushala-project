import React, {
  useEffect,
  useState,
  useContext,
} from "react";

import axios from "axios";

import { LanguageContext } from "../LanguageContext";

function AdoptCow() {

  const token = localStorage.getItem("token");

  const { t } = useContext(LanguageContext);

  const [cows, setCows] = useState([]);

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [health, setHealth] = useState("");
  const [image, setImage] = useState("");

  // Fetch Cows
  const fetchCows = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/cow"
      );

      setCows(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchCows();

  }, []);

  // Add Cow
  const addCow = async () => {

    if (
      !name ||
      !dob ||
      !gender ||
      !breed ||
      !health ||
      !image
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      await axios.post(
        "http://localhost:5000/cow/add",
        {
          name,
          dob,
          gender,
          breed,
          health,
          image,
        }
      );

      setName("");
      setDob("");
      setGender("");
      setBreed("");
      setHealth("");
      setImage("");

      fetchCows();

    } catch (error) {

      console.log(error);

    }
  };

  // Delete Cow
  const deleteCow = async (id) => {

    const confirmDelete = window.confirm(
      "Do you want to delete this cow?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5000/cow/${id}`
      );

      fetchCows();

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
        {t.adoptCow}
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
            placeholder="Cow Name"
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
            placeholder="DOB"
            value={dob}
            onChange={(e) =>
              setDob(e.target.value)
            }
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          />

          <input
            placeholder="Gender"
            value={gender}
            onChange={(e) =>
              setGender(e.target.value)
            }
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          />

          <input
            placeholder="Breed"
            value={breed}
            onChange={(e) =>
              setBreed(e.target.value)
            }
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          />

          <input
            placeholder="Health"
            value={health}
            onChange={(e) =>
              setHealth(e.target.value)
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

          <button
            onClick={addCow}
            style={{
              background: "green",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Add Cow
          </button>
        </div>
      )}

      {/* Cow Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3,1fr)",
          gap: "20px",
        }}
      >
        {cows.map((cow) => (
          <div
            key={cow._id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow:
                "0px 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={cow.image}
              alt={cow.name}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            <h2
              style={{
                color: "green",
              }}
            >
              {cow.name}
            </h2>

            <p>
              <b>DOB:</b> {cow.dob}
            </p>

            <p>
              <b>Gender:</b> {cow.gender}
            </p>

            <p>
              <b>Breed:</b> {cow.breed}
            </p>

            <p>
              <b>Health:</b> {cow.health}
            </p>

            {token && (
              <button
                onClick={() =>
                  deleteCow(cow._id)
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

export default AdoptCow;