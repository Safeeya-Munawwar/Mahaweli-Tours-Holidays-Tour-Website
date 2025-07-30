import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const AdminBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  // Ref for the form container to scroll into view
  const formRef = useRef(null);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
    else setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || (!imageFile && !editId)) {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (imageFile) formData.append("image", imageFile);

      if (editId) {
        await axios.put(`http://localhost:5000/api/blogs/${editId}`, formData);
        setMessage("Blog updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/blogs", formData);
        setMessage("Blog posted successfully!");
      }

      setTitle("");
      setContent("");
      setImageFile(null);
      setImagePreview(null);
      setEditId(null);
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
      setMessage("Error saving blog.");
    }
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setEditId(blog._id);
    setImagePreview(blog.imageUrl ? `http://localhost:5000${blog.imageUrl}` : null);
    setImageFile(null); // reset file input since we already have existing image

    // Scroll to the form smoothly on edit
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:5000/api/blogs/${id}`);
        setMessage("Blog deleted.");
        fetchBlogs();
      } catch (error) {
        console.error("Delete failed:", error);
        setMessage("Delete failed.");
      }
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "Segoe UI, sans-serif" }}>
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
        Admin Blog Management
      </h3>
      <div
  ref={formRef}
  style={{
    display: "flex",
    justifyContent: "center",
    marginBottom: 40,
  }}
>
  <form
    onSubmit={handleSubmit}
    encType="multipart/form-data"
    style={{ width: "100%", maxWidth: 500 }}
  >
    <h2 style={{ color: "#064420", textAlign: "center" }}>
      {editId ? "Edit Blog Post" : "Add New Blog Post"}
    </h2>

          <div style={{ marginBottom: 10, maxWidth: 500 }}>
            <label>Title:</label><br />
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: "100%", padding: 10, fontSize: 14 }}
            />
          </div>

          <div style={{ marginBottom: 10, maxWidth: 500 }}>
            <label>Content:</label><br />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              required
              style={{ width: "100%", padding: 10, fontSize: 14 }}
            />
          </div>

          <div style={{ marginBottom: 10, maxWidth: 500 }}>
            <label>Image:</label><br />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: "100%", maxWidth: 200, marginTop: 10, borderRadius: 4 }}
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
            {editId ? "Update Blog" : "Post Blog"}
          </button>
        </form>
      </div>

      {message && (
        <p style={{ marginTop: 20, color: message.includes("successfully") ? "green" : "red" }}>
          {message}
        </p>
      )}

      <hr style={{ margin: "40px 0" }} />

      <h3 style={{ color: "#064420" }}>All Blogs</h3>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {blogs.map((blog) => (
            <div
              key={blog._id}
              style={{
                border: "1px solid #ccc",
                padding: 20,
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h4 style={{ marginBottom: 10 }}>{blog.title}</h4>
              <p style={{ flexGrow: 1 }}>{blog.content}</p>
              {blog.imageUrl && (
                <img
                  src={`http://localhost:5000${blog.imageUrl}`}
                  alt="blog"
                  style={{ width: "100%", maxWidth: "100%", borderRadius: 4, marginTop: 10 }}
                />
              )}
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: 10,
                }}
              >
                <button
                  onClick={() => handleEdit(blog)}
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
                  onClick={() => handleDelete(blog._id)}
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
};

export default AdminBlog;
