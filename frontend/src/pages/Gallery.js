import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filter photos by title (case-insensitive)
  const filteredPhotos = photos.filter(photo =>
    photo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "50px auto",
        padding: "0 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
        
{/* Search Input with Icon */}
<div
  style={{
    position: "relative",
    maxWidth: 400,
    margin: "0 0 30px auto", // right align container with auto left margin
    width: "100%",
  }}
>

  <input
    type="text"
    placeholder="Search photos by title..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      width: "100%",
      padding: "10px 40px 10px 15px", // extra right padding for icon
      fontSize: "1rem",
      borderRadius: 8,
      border: "1px solid #ccc",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      outline: "none",
      boxSizing: "border-box",
    }}
  />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#888"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      position: "absolute",
      right: 12,
      top: "50%",
      transform: "translateY(-50%)",
      width: 20,
      height: 20,
      pointerEvents: "none",
    }}
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
</div>


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

      {filteredPhotos.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>
          {photos.length === 0 ? "No photos found." : "No photos match your search."}
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {filteredPhotos.map((photo) => (
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
          box-shadow: 0 8px 20px rgba(6, 94, 70, 0.3); /* Mahaweli green shadow */
          transform: scale(1.02);
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default Gallery;
