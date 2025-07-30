import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const AdminTours = () => {
  const [tours, setTours] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    rating: 10,
    description: "",
    price: "",
    duration: "",
    image: null,
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef();

  const fetchTours = async () => {
    const res = await axios.get("http://localhost:5000/api/tours");
    setTours(res.data);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    const convertedFormData = {
      ...formData,
      price: Number(formData.price),
      rating: Number(formData.rating),
    };

    Object.entries(convertedFormData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/tours/${editId}`, data);
        setMessage("Tour updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/tours", data);
        setMessage("Tour added successfully!");
      }

      // Reset and refresh
      setFormData({
        title: "",
        location: "",
        rating: 10,
        description: "",
        price: "",
        duration: "",
        image: null,
      });

      setEditId(null);
      fileInputRef.current.value = null;
      fetchTours(); // <- ✅ refresh the tour list
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      alert("Error saving tour");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tours/${id}`);
    fetchTours();
  };

  const handleEdit = (tour) => {
    setFormData({ ...tour, image: null });
    setEditId(tour._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <h1 style={headerTitle}>Mahaweli Tours & Holidays</h1>
      <h3 style={headerSubtitle}>Admin Tour Packages Management</h3>

      {message && <div style={successBox}>{message}</div>}

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={{ marginBottom: 30 }}
      >
        <h2 style={{ color: "#064420", textAlign: "center" }}>
          {editId ? "Edit Tour Package" : "Add New Tour Package"}
        </h2>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 15,
            marginBottom: 15,
          }}
        >
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Rating"
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: e.target.value })
            }
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Duration"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            style={inputStyle}
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            style={{ ...inputStyle, minHeight: 80 }}
          />
          <input
            type="file"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
            ref={fileInputRef}
            style={{
              padding: 10,
              fontSize: 14,
              width: "800px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button type="submit" style={buttonStyle}>
            {editId ? "Update" : "Add"} Tour
          </button>
        </div>
      </form>

      <h2>All Tours</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 20,
        }}
      >
        {tours.map((tour) => (
          <div key={tour._id} style={cardStyle}>
            <img
              src={`http://localhost:5000${tour.imageUrl}`}
              alt={tour.title}
              style={{
                width: "100%",
                height: 150,
                objectFit: "cover",
                borderRadius: 4,
              }}
            />

            <h3
              style={{
                margin: "10px 0 5px",
                color: "#2c5d30",
                fontSize: "1.8rem",
              }}
            >
              {tour.title}
            </h3>

            <p style={infoStyle}>
              📍 <strong>Location: </strong> {tour.location}
            </p>
            <p style={infoStyle}>
              ⏱ <strong>Duration: </strong> {tour.duration}
            </p>
            <p style={infoStyle}>
              ⭐ <strong>Rating: </strong>
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  style={{
                    color: i < tour.rating ? "#ffc107" : "#ddd",
                    fontSize: "1.1rem",
                  }}
                >
                  ★
                </span>
              ))}
            </p>

            <p style={infoStyle}>
              <strong>Price:</strong> Rs. {tour.price}
            </p>

            <p style={{ fontSize: 16, color: "black", marginTop: 10 }}>
              {tour.description}
            </p>

            <div style={{ display: "flex", gap: "10px", marginTop: 10 }}>
              <button onClick={() => handleEdit(tour)} style={editBtn}>
                Edit
              </button>
              <button onClick={() => handleDelete(tour._id)} style={deleteBtn}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ====== Styles ======

const headerTitle = {
  fontFamily: "'Great Vibes', cursive",
  fontSize: "3.6rem",
  color: "#064420",
  textAlign: "center",
  marginBottom: 12,
  userSelect: "none",
  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const headerSubtitle = {
  textAlign: "center",
  marginBottom: 40,
  fontSize: "2.6rem",
  fontWeight: "700",
  letterSpacing: "0.04em",
  color: "#2c5d30",
};

const successBox = {
  backgroundColor: "#4caf50",
  color: "white",
  padding: 10,
  marginBottom: 20,
  borderRadius: 5,
  textAlign: "center",
};

const inputStyle = {
  padding: 10,
  fontSize: 14,
  width: "800px",
  boxSizing: "border-box",
};

const buttonStyle = {
  backgroundColor: "#064420",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: "600",
  padding: 10,
  fontSize: 14,
  width: "800px",
  alignItems: "center",
};

const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: 6,
  padding: 10,
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  backgroundColor: "#fff",
};

const infoStyle = {
  fontSize: 18,
  color: "black",
  margin: "4px 0",
};

const editBtn = {
  backgroundColor: "#ffa500",
  color: "white",
  padding: "6px 12px",
  border: "none",
  cursor: "pointer",
  borderRadius: 4,
  fontSize: 14,
  fontWeight: "600",
  flex: 1,
};

const deleteBtn = {
  backgroundColor: "#b30000",
  color: "white",
  padding: "6px 12px",
  border: "none",
  cursor: "pointer",
  borderRadius: 4,
  fontSize: 14,
  fontWeight: "600",
  flex: 1,
};

export default AdminTours;
