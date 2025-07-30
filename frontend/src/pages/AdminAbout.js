import React, { useState, useEffect } from "react";

const LOCALSTORAGE_KEY = "mahaweli_about_data";

function AdminAbout() {
  const [aboutTexts, setAboutTexts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [saving, setSaving] = useState(false);

  // Load saved data from localStorage or default content
  useEffect(() => {
    const savedData = localStorage.getItem(LOCALSTORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setAboutTexts(parsed.aboutTexts || []);
      setTestimonials(parsed.testimonials || []);
    } else {
      // Default initial content if none saved
      setAboutTexts([
        "Mahaweli Tours & Holidays started in 2009 in Kandy...",
        "We provide luxury vehicles and experienced guides...",
      ]);
      setTestimonials([
        {
          id: 1,
          name: "John Smith",
          message: "Great service!",
          date: "2025-06-15",
        },
      ]);
    }
  }, []);

  // Save current data to localStorage
  const handleSave = () => {
    setSaving(true);
    const dataToSave = { aboutTexts, testimonials };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(dataToSave));
    setSaving(false);
    alert("Changes saved!");
  };

  // Handlers to edit about texts and testimonials
  const handleAboutChange = (index, value) => {
    const newAbout = [...aboutTexts];
    newAbout[index] = value;
    setAboutTexts(newAbout);
  };

  const handleAddAbout = () => setAboutTexts([...aboutTexts, ""]);

  const handleDeleteAbout = (index) => {
    if (window.confirm("Delete this paragraph?")) {
      const newAbout = aboutTexts.filter((_, i) => i !== index);
      setAboutTexts(newAbout);
    }
  };

  const handleTestimonialChange = (id, field, value) => {
    setTestimonials((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              [field]: value,
            }
          : t
      )
    );
  };

  const handleAddTestimonial = () => {
    const newTestimonial = {
      id: Date.now(),
      name: "",
      message: "",
      date: new Date().toISOString().split("T")[0],
    };
    setTestimonials([newTestimonial, ...testimonials]);
  };

  const handleDeleteTestimonial = (id) => {
    if (window.confirm("Delete this testimonial?")) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
    }
  };

  // Hover style handlers for buttons
  const addBtnHover = (e) => (e.target.style.backgroundColor = "#1b4d21");
  const addBtnUnhover = (e) => (e.target.style.backgroundColor = "#2e7d32");
  const deleteBtnHover = (e) => (e.target.style.backgroundColor = "#7b1a1a");
  const deleteBtnUnhover = (e) => (e.target.style.backgroundColor = "#c62828");

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", padding: 20 }}>
      <h1 style={headingStyle}>Mahaweli Tours & Holidays</h1>

      <h3 style={subHeadingStyle}>Admin About Management</h3>

      <section style={sectionStyle}>
        {aboutTexts.map((text, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <textarea
              rows={3}
              style={inputStyle}
              value={text}
              onChange={(e) => handleAboutChange(i, e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#064420")}
              onBlur={(e) => (e.target.style.borderColor = "#a4d4a5")}
            />
            <button
              onClick={() => handleDeleteAbout(i)}
              style={deleteBtnStyle}
              onMouseEnter={deleteBtnHover}
              onMouseLeave={deleteBtnUnhover}
              type="button"
            >
              Delete Paragraph
            </button>
          </div>
        ))}
        <button
          onClick={handleAddAbout}
          style={addBtnStyle}
          onMouseEnter={addBtnHover}
          onMouseLeave={addBtnUnhover}
          type="button"
        >
          + Add Paragraph
        </button>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ color: "#064420" }}>Testimonials</h2>
        <button
          onClick={handleAddTestimonial}
          style={addBtnStyle}
          onMouseEnter={addBtnHover}
          onMouseLeave={addBtnUnhover}
          type="button"
        >
          + Add Testimonial
        </button>

        {testimonials.map(({ id, name, message, date }) => (
          <div
            key={id}
            style={{
              background: "#e8f5e9",
              borderRadius: 12,
              padding: 20,
              marginTop: 14,
              boxShadow: "0 4px 12px rgba(0,128,0,0.1)",
            }}
          >
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => handleTestimonialChange(id, "name", e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#064420")}
              onBlur={(e) => (e.target.style.borderColor = "#a4d4a5")}
            />
            <input
              type="date"
              value={date}
              onChange={(e) => handleTestimonialChange(id, "date", e.target.value)}
              style={{ ...inputStyle, marginTop: 12 }}
              onFocus={(e) => (e.target.style.borderColor = "#064420")}
              onBlur={(e) => (e.target.style.borderColor = "#a4d4a5")}
            />
            <textarea
              rows={3}
              placeholder="Message"
              value={message}
              onChange={(e) => handleTestimonialChange(id, "message", e.target.value)}
              style={{ ...inputStyle, marginTop: 12 }}
              onFocus={(e) => (e.target.style.borderColor = "#064420")}
              onBlur={(e) => (e.target.style.borderColor = "#a4d4a5")}
            />
            <button
              onClick={() => handleDeleteTestimonial(id)}
              style={deleteBtnStyle}
              onMouseEnter={deleteBtnHover}
              onMouseLeave={deleteBtnUnhover}
              type="button"
            >
              Delete Testimonial
            </button>
          </div>
        ))}
      </section>

      <button
        onClick={handleSave}
        disabled={saving}
        style={{
          ...addBtnStyle,
          marginTop: 24,
          backgroundColor: saving ? "#4caf5080" : "#1b5e20",
          cursor: saving ? "not-allowed" : "pointer",
        }}
        type="button"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

// Styles
const sectionStyle = {
  marginBottom: 40,
  padding: 24,
  borderRadius: 12,
  backgroundColor: "#f4f9f4",
  boxShadow: "0 6px 14px rgba(0, 128, 0, 0.12)",
};

const addBtnStyle = {
  padding: "12px 28px",
  backgroundColor: "#2e7d32",
  color: "white",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: "700",
  fontSize: 16,
  boxShadow: "0 4px 12px rgba(46, 125, 50, 0.7)",
  transition: "background-color 0.3s ease",
};

const deleteBtnStyle = {
  marginTop: 10,
  padding: "8px 16px",
  backgroundColor: "#c62828",
  color: "white",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: "600",
  fontSize: 14,
  boxShadow: "0 4px 10px rgba(198, 40, 40, 0.7)",
  transition: "background-color 0.3s ease",
};

const inputStyle = {
  width: "100%",
  padding: 12,
  fontSize: 16,
  borderRadius: 10,
  border: "2px solid #a4d4a5",
  boxSizing: "border-box",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  transition: "border-color 0.3s ease",
};

const headingStyle = {
  fontFamily: "'Great Vibes', cursive",
  fontSize: "3.6rem",
  color: "#064420",
  textAlign: "center",
  marginBottom: 12,
  userSelect: "none",
  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const subHeadingStyle = {
  textAlign: "center",
  marginBottom: 40,
  fontSize: "2.6rem",
  fontWeight: "700",
  letterSpacing: "0.04em",
  color: "#2c5d30",
};

export default AdminAbout;
