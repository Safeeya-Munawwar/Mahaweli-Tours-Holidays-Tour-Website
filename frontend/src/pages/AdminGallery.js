import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function AdminGallery() {
  const [photos, setPhotos] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    imageFile: null,
    imagePreview: "",
  });
  const [message, setMessage] = useState("");
  const fileInputRef = useRef();
  const formRef = useRef();

  // Load photos from backend
  const fetchPhotos = async () => {
    try {
      const res = await axios.get("/api/gallery");
      setPhotos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle file input change with preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({ id: null, title: "", imageFile: null, imagePreview: "" });
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  // Add or update photo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Title is required.");
      return;
    }
    if (!formData.imageFile && !formData.id) {
      alert("Image is required.");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("title", formData.title.trim());
    if (formData.imageFile) formPayload.append("image", formData.imageFile);

    try {
      if (formData.id) {
        await axios.put(`/api/gallery/${formData.id}`, formPayload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Photo updated successfully!");
      } else {
        await axios.post("/api/gallery", formPayload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Photo added successfully!");
      }
      resetForm();
      fetchPhotos();
      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(
        "Error saving photo:",
        error.response ? error.response.data : error.message
      );
      alert("Error saving photo: " + (error.response?.data?.error || error.message));
    }
  };

  // Delete photo
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;
    try {
      await axios.delete(`/api/gallery/${id}`);
      setMessage("Photo deleted successfully!");
      fetchPhotos();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      alert("Error deleting photo");
      console.error(error);
    }
  };

  // Populate form for editing and scroll into view
  const startEdit = (photo) => {
    setFormData({
      id: photo._id,
      title: photo.title,
      imageFile: null,
      imagePreview: photo.imageUrl,
    });
    if (fileInputRef.current) fileInputRef.current.value = null;

    // Scroll form into view smoothly
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "Segoe UI, sans-serif", maxWidth: 900, margin: "auto" }}>
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
        Admin Gallery Management
      </h3>

      {message && (
        <p
          style={{
            marginTop: 20,
            color: message.includes("successfully") ? "green" : "red",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          {message}
        </p>
      )}

      <div
        ref={formRef}
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 500 }}>
          <h2 style={{ color: "#064420", textAlign: "center" }}>
            {formData.id ? "Edit Photo" : "Add New Photo"}
          </h2>

          <div style={{ marginBottom: 10 }}>
            <label>Title:</label>
            <br />
            <input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Photo Title"
              required
              style={{ width: "100%", padding: 10, fontSize: 14 }}
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>Image:</label>
            <br />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            {formData.imagePreview && (
              <img
                src={formData.imagePreview}
                alt="Preview"
                style={{ maxWidth: 200, marginTop: 10, borderRadius: 4 }}
              />
            )}
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#064420",
              color: "white",
              padding: "8px 16px",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              borderRadius: 4,
            }}
          >
            {formData.id ? "Update Photo" : "Add Photo"}
          </button>

          {formData.id && (
            <button
              type="button"
              onClick={resetForm}
              style={{
                marginLeft: 10,
                backgroundColor: "#b30000",
                color: "white",
                padding: "8px 16px",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                borderRadius: 4,
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <hr style={{ margin: "40px 0" }} />

      <h3 style={{ color: "#064420" }}>All Photos</h3>

      {photos.length === 0 ? (
        <p>No photos found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {photos.map((photo) => (
            <div
              key={photo._id}
              style={{
                border: "1px solid #ccc",
                padding: 20,
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
                userSelect: "none",
              }}
            >
              <h4 style={{ marginBottom: 10 }}>{photo.title}</h4>
              {photo.imageUrl && (
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    borderRadius: 4,
                    marginBottom: 10,
                    objectFit: "cover",
                    height: 180,
                  }}
                />
              )}
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => startEdit(photo)}
                  style={{
                    backgroundColor: "#ffa500",
                    color: "white",
                    padding: "6px 12px",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: 4,
                    fontSize: 14,
                    fontWeight: "600",
                    flex: 1,
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(photo._id)}
                  style={{
                    backgroundColor: "#b30000",
                    color: "white",
                    padding: "6px 12px",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: 4,
                    fontSize: 14,
                    fontWeight: "600",
                    flex: 1,
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminGallery;
