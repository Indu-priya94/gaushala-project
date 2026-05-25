import React, {
  useEffect,
  useState,
  useContext,
} from "react";

import axios from "axios";

import { LanguageContext } from "../LanguageContext";

function Gallery() {

  const token = localStorage.getItem("token");

  const { t } = useContext(LanguageContext);

  const [image, setImage] = useState("");

  const [gallery, setGallery] = useState([]);

  // Fetch Images
  const fetchImages = async () => {

    try {

      const res = await axios.get(
        "http://https://gaushala-project-600k.onrender.com/gallery"
      );

      setGallery(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchImages();

  }, []);

  // Add Image
  const addImage = async () => {

    if (!image) {
      alert("Please enter image URL");
      return;
    }

    try {

      await axios.post(
        "http://https://gaushala-project-600k.onrender.com/gallery/add",
        {
          image,
        }
      );

      setImage("");

      fetchImages();

    } catch (error) {

      console.log(error);

    }
  };

  // Delete Image
  const deleteImage = async (id) => {

    const confirmDelete = window.confirm(
      "Do you want to delete this image?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://https://gaushala-project-600k.onrender.com/gallery/${id}`
      );

      fetchImages();

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
        {t.gallery}
      </h1>

      {/* Admin Upload */}
      {token && (
        <div
          style={{
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          <input
            type="text"
            placeholder="Enter Image URL"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
            style={{
              padding: "10px",
              width: "300px",
              marginRight: "10px",
            }}
          />

          <button
            onClick={addImage}
            style={{
              background: "green",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Upload
          </button>
        </div>
      )}

      {/* Gallery Images */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3,1fr)",
          gap: "20px",
        }}
      >
        {gallery.map((item) => (
          <div
            key={item._id}
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <img
              src={item.image}
              alt=""
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            {token && (
              <button
                onClick={() =>
                  deleteImage(item._id)
                }
                style={{
                  marginTop: "10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  width: "100%",
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

export default Gallery;