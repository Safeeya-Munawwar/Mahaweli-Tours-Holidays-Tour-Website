import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminHome() {
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [content, setContent] = useState("");
  const [contact, setContact] = useState("");
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/home-content")
      .then((res) => {
        const data = res.data;
        setTitle(data.title || "");
        setIntro(data.intro || "");
        setContent(data.description || "");
        setContact(data.contact || "");
        setStats(Array.isArray(data.stats) ? data.stats : []);
      })
      .catch((err) => console.error("Failed to load admin content", err));
  }, []);

  const handleSave = async () => {
    try {
      const sanitizedStats = stats.map((s) => ({
        number: String(s.number || ""),
        label: String(s.label || ""),
      }));

      const payload = {
        title,
        intro,
        description: content,
        contact,
        stats: sanitizedStats,
      };

      console.log("Saving data:", payload);

      await axios.put("http://localhost:5000/api/home-content", payload);

      alert("Content Updated Successfully!");
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update content.");
    }
  };

  const handleFocus = (e) => {
    e.currentTarget.style.borderColor = "#2e7d32";
    e.currentTarget.style.outline = "none";
  };

  const handleBlur = (e) => {
    e.currentTarget.style.borderColor = "#a5d6a7";
  };

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", padding: 20 }}>
                 <h1
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: "3.6rem",
          color: "#064420",
          textAlign: "center",
          marginBottom: 12,
          userSelect: "none",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        Mahaweli Tours & Holidays
      </h1>

      <h3
        style={{
          textAlign: "center",
          marginBottom: 40,
          fontSize: "2.6rem",
          fontWeight: "700",
          letterSpacing: "0.04em",
          color: "#2c5d30",
        }}
      >
        Admin Home Management
      </h3>

      <label style={labelStyle}>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </label>

      <label style={labelStyle}>
        Intro:
        <textarea
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          rows={3}
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </label>

      <label style={labelStyle}>
        Description:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </label>

      <label style={labelStyle}>
        Contact:
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </label>

      <h3 style={{ marginTop: 30, color: "#1b5e20" }}>Stats</h3>
      <div style={statsContainerStyle}>
        {stats.length === 0 ? (
          <p style={{ fontStyle: "italic", color: "#4a6b39" }}>No stats available</p>
        ) : (
          stats.map((stat, index) => (
            <div key={index} style={statRowStyle}>
              <input
                type="text"
                value={stat.number}
                onChange={(e) => {
                  const updated = [...stats];
                  updated[index].number = e.target.value;
                  setStats(updated);
                }}
                placeholder="Number"
                style={statInputNumberStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <input
                type="text"
                value={stat.label}
                onChange={(e) => {
                  const updated = [...stats];
                  updated[index].label = e.target.value;
                  setStats(updated);
                }}
                placeholder="Label"
                style={statInputLabelStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          ))
        )}
      </div>

      <button
        style={buttonStyle}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
        onClick={handleSave}
      >
        Save Changes
      </button>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontWeight: "600",
  marginBottom: 6,
  marginTop: 20,
  fontSize: 16,
};

const inputStyle = {
  width: "100%",
  padding: 10,
  borderRadius: 6,
  border: "1px solid #a5d6a7",
  fontSize: 15,
  boxSizing: "border-box",
  transition: "border-color 0.2s ease",
};

const statsContainerStyle = {
  marginTop: 10,
  marginBottom: 20,
};

const statRowStyle = {
  display: "flex",
  gap: 10,
  marginBottom: 10,
};

const statInputNumberStyle = {
  ...inputStyle,
  flex: 1,
};

const statInputLabelStyle = {
  ...inputStyle,
  flex: 2,
};

const buttonStyle = {
  padding: "12px 20px",
  backgroundColor: "#2e7d32",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: 16,
  marginTop: 30,
  transition: "background-color 0.3s ease",
};

const buttonHoverStyle = {
  backgroundColor: "#256029",
};

export default AdminHome;
