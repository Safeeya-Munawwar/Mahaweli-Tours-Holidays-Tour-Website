import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/gallery`);
        setPhotos(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPhotos();
  }, []);

  const openModal = (imageUrl) => setSelectedImage(imageUrl);
  const closeModal = () => setSelectedImage(null);

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "50px auto",
        padding: "0 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
        <h2
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: "2.5rem",
          color: "#064420",
          textAlign: "center",
          marginBottom: 40,
          marginTop: 40,
          userSelect: "none",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        A Glimpse into Unforgettable Journeys
      </h2>

      {photos.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>No photos found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {photos.map((photo) => (
            <div
              key={photo._id}
              className="gallery-card"
              style={{
                backgroundColor: "#f9fbe7",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
                transition: "transform 0.25s ease",
                cursor: "pointer",
              }}
              onClick={() => openModal(`${BACKEND_URL}${photo.imageUrl}`)}
            >
              <img
                src={`${BACKEND_URL}${photo.imageUrl}`}
                alt={photo.title}
                style={{
                  width: "100%",
                  height: 160,
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "12px 15px" }}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "1.1rem",
                    color: "#064420",
                    textAlign: "center",
                  }}
                >
                  {photo.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Lightbox */}
      {selectedImage && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <img
            src={selectedImage}
            alt="Large View"
            style={{
              maxHeight: "90%",
              maxWidth: "90%",
              borderRadius: 8,
              boxShadow: "0 0 20px rgba(0,0,0,0.5)",
            }}
          />
          <button
            onClick={closeModal}
            style={{
              position: "absolute",
              top: 30,
              right: 40,
              fontSize: 30,
              color: "white",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
        </div>
      )}

      <style>{`
        .gallery-card:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}

export default Gallery;
