import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

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
        {blogs.map((b) => (
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
