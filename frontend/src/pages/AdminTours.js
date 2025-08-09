import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

const AdminTours = () => {
  const [tours, setTours] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isSpecial, setIsSpecial] = useState(false);
  const [price, setPrice] = useState(""); // New price state
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);

  const formRef = useRef(null);

  const fetchTours = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tours");
      setTours(response.data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  }, []);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("duration", duration);
    formData.append("rating", rating);
    formData.append("description", description);
    formData.append("isSpecial", isSpecial);
    formData.append("price", price); // Append price
    if (imageFile) formData.append("image", imageFile);

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/tours/${editId}`, formData);
        alert("Tour Updated Successfully!");
      } else {
        await axios.post("http://localhost:5000/api/tours", formData);
        alert("Tour Added Successfully!");
      }
      fetchTours();
      setTitle("");
      setLocation("");
      setDuration("");
      setRating(0);
      setDescription("");
      setImageFile(null);
      setIsSpecial(false);
      setPrice(""); // Reset price
      setEditId(null);
    } catch (error) {
      console.error("Error submitting tour:", error);
      alert("An error occurred while saving the tour.");
    }
  };

  const handleEdit = (tour) => {
    setTitle(tour.title);
    setLocation(tour.location);
    setDuration(tour.duration);
    setRating(tour.rating);
    setDescription(tour.description);
    setIsSpecial(tour.isSpecial);
    setPrice(tour.price || ""); // Load price from tour
    setEditId(tour._id);

    // Scroll to form
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      try {
        await axios.delete(`http://localhost:5000/api/tours/${id}`);
        alert("Tour Deleted!");
        fetchTours();
      } catch (error) {
        console.error("Error deleting tour:", error);
        alert("Failed to delete tour.");
      }
    }
  };

  // Filter tours based on filter state
  const filteredTours = tours.filter((tour) => {
    if (filter === "special") return tour.isSpecial;
    if (filter === "regular") return !tour.isSpecial;
    return true;
  });

  const filterButton = {
    backgroundColor: "#2c5d30",
    width: 300,
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
    marginTop: "30px",
  };

  const filterButtonActive = {
    ...filterButton,
    backgroundColor: "#ffa500",
  };

  const formStyle = {
    maxWidth: 630,
    margin: "20px auto",
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    width: 600,
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  };

  const buttonStyle = {
    backgroundColor: "#2c5d30",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
    marginTop: "20px",
    textAlign: "center",
    width: 100,
  };

  const fbuttonStyle = {
    backgroundColor: "#2c5d30",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
    marginTop: "20px",
    textAlign: "center",
    width: 250,
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    padding: "20px",
  };

  const cardStyle = {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  const imageStyle = {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px",
  };

  const infoStyle = {
    margin: "5px 0",
    fontSize: "1rem",
  };

  const descriptionStyle = {
    marginTop: "10px",
    color: "#555",
  };

  return (
    <div style={{ padding: 40, fontFamily: "Segoe UI, sans-serif", margin: "auto" }}>
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
        Admin Tours Management
      </h3>
      <form ref={formRef} onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ color: "#064420", textAlign: "center" }}>{editId ? "Edit Tour" : "Add New Tour"}</h2>
        <label>Title:</label>
        <input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <label>Location:</label>
        <input style={inputStyle} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
        <label>Duration:</label>
        <input style={inputStyle} value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration" required />
        <label>Rating:</label>
        <input
          style={inputStyle}
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rating (0-5)"
          required
          min="0"
          max="5"
        />
        <label>Price (LKR):</label> {/* New Price Input */}
        <input
          style={inputStyle}
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
          min="0"
        />
        <label>Description:</label>
        <textarea style={inputStyle} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        <label>Image:</label>
        <input style={inputStyle} type="file" onChange={(e) => setImageFile(e.target.files[0])} />
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer",
            color: "#2c5d30",
            marginTop: "10px",
          }}
        >
          <input
            type="checkbox"
            checked={isSpecial}
            onChange={() => setIsSpecial(!isSpecial)}
            style={{
              width: "18px",
              height: "18px",
              cursor: "pointer",
            }}
          />
          Special Tour
        </label>

        <br />
        <div style={{ textAlign: "center" }}>
          <button type="submit" style={fbuttonStyle}>
            {editId ? "Update" : "Add"}
          </button>
          <button type="button" onClick={() => setEditId(null)} style={fbuttonStyle}>
            Clear
          </button>
        </div>

        <br />
        <br />
      </form>

      {/* Filter Buttons */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <button onClick={() => setFilter("all")} style={filter === "all" ? filterButtonActive : filterButton}>
          All
        </button>
        <button onClick={() => setFilter("special")} style={filter === "special" ? filterButtonActive : filterButton}>
          Special Tours
        </button>
        <button onClick={() => setFilter("regular")} style={filter === "regular" ? filterButtonActive : filterButton}>
          Regular Tours
        </button>
      </div>

      <div style={gridStyle}>
        {filteredTours.map((tour) => (
          <div key={tour._id} style={cardStyle}>
            <div style={{ position: "relative" }}>
              {tour.isSpecial && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    backgroundColor: "orange",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    zIndex: 1,
                  }}
                >
                  ⭐ Special
                </div>
              )}
              <img src={`http://localhost:5000${tour.imageUrl}`} alt={tour.title} style={imageStyle} />
            </div>
            <h3 style={{ margin: "10px 0 5px", color: "#2c5d30", fontSize: "1.8rem" }}>{tour.title}</h3>

            <p style={infoStyle}>
              📍 <strong>Location: </strong>
              {tour.location}
            </p>
            <p style={infoStyle}>
              ⏱ <strong>Duration: </strong>
              {tour.duration}
            </p>
            <p style={infoStyle}>
              💰 <strong>Price: </strong>LKR {tour.price}
            </p>
            <p style={infoStyle}>
              ⭐ <strong>Rating: </strong>
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} style={{ color: i < tour.rating ? "#ffc107" : "#ddd", fontSize: "1.1rem" }}>
                  ★
                </span>
              ))}
            </p>
            <p style={descriptionStyle}>{tour.description}</p>
            <div style={{ textAlign: "center" }}>
              <button onClick={() => handleEdit(tour)} style={buttonStyle}>
                Edit
              </button>
              <button onClick={() => handleDelete(tour._id)} style={{ ...buttonStyle, backgroundColor: "#c0392b" }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTours;
