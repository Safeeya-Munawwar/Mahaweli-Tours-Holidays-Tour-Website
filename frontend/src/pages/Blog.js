import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

const filteredBlogs = blogs.filter(b =>
  b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  b.content.toLowerCase().includes(searchTerm.toLowerCase())
);


  useEffect(() => {
    axios.get("http://localhost:5000/api/blogs").then((res) => setBlogs(res.data));
  }, []);

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "40px auto",
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
    placeholder="Search blogs by title..."
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
        Travel Wisdom from Sri Lanka
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(450px, 1fr))",
          gap: 20,
        }}
      >
        {filteredBlogs.map((b) => (
          <div
            key={b._id}
            style={{
              borderRadius: 12,
              padding: 20,
              backgroundColor: "#f1f8e9",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              display: "flex",
              flexDirection: "column",
              gap: 15,
            }}
          >
            <h3 style={{ fontSize: "1.5rem", margin: 0, color: "#064420", fontFamily: "'Dancing Script', cursive" }}>{b.title}</h3>
            
            {b.imageUrl && (
              <img
                src={`http://localhost:5000${b.imageUrl}`}
                alt={b.title}
                style={{
                  width: "100%",
                  borderRadius: 10,
                  maxHeight: 180,
                  objectFit: "cover",
                  boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                }}
              />
            )}
            <p style={{ flexGrow: 1, color: "#333", fontSize: "1rem", lineHeight: 1.6 }}>
              {b.content.substring(0, 150)}...
            </p>
            <Link to={`/blog/${b._id}`} style={readMoreBtnStyle}>
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const readMoreBtnStyle = {
  display: "inline-block",
  padding: "10px 18px",
  backgroundColor: "#064420",
  color: "white",
  textDecoration: "none",
  borderRadius: 6,
  fontWeight: "600",
  fontSize: 14,
  textAlign: "center",
  cursor: "pointer",
  alignSelf: "flex-start",
  transition: "background-color 0.3s ease",
};

export default Blog;
