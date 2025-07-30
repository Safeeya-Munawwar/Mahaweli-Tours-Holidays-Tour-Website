import React, { useState, useEffect } from "react";

const LOCALSTORAGE_KEY = "mahaweli_contact_info";

const initialContactInfo = {
  phone: "+94777 111553",
  email: "info@mahaweli.lk",
  corporateOffice: "No 15/7, Bernadett Mawatha, Kandana, Sri Lanka",
  regionalOffice: "337/1, Katugasthora Road, Kandy, Sri Lanka",
  socialMedia: {
    Facebook: "https://www.facebook.com",
    Youtube: "https://www.youtube.com",
    Tripadvisor: "https://www.tripadvisor.com",
    Pinterest: "https://www.pinterest.com",
    Instagram: "https://www.instagram.com",
    Google: "https://www.google.com",
  },
};

function AdminContact() {
  const [contactInfo, setContactInfo] = useState(initialContactInfo);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LOCALSTORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        // Ensure socialMedia is an object, else reset to default
        if (!parsed.socialMedia || typeof parsed.socialMedia !== "object") {
          parsed.socialMedia = { ...initialContactInfo.socialMedia };
        }

        setContactInfo(parsed);
      } catch {
        localStorage.removeItem(LOCALSTORAGE_KEY);
        setContactInfo(initialContactInfo);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSocialChange = (platform, value) => {
    setContactInfo((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value,
      },
    }));
  };

  const handleSave = () => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(contactInfo));
    alert("Contact information saved!");
    setEditing(false);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset to default values?")) {
      setContactInfo(initialContactInfo);
      localStorage.removeItem(LOCALSTORAGE_KEY);
      setEditing(false);
    }
  };

  const onButtonHover = (e) => {
    e.currentTarget.style.filter = "brightness(1.1)";
  };

  const onButtonLeave = (e) => {
    e.currentTarget.style.filter = "brightness(1)";
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "auto",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
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
        Admin Contact Management
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        <label style={{ display: "block" }}>
          Phone:
          <input
            name="phone"
            value={contactInfo.phone}
            onChange={handleChange}
            disabled={!editing}
            style={inputStyle}
          />
        </label>

        <label style={{ display: "block" }}>
          Email:
          <input
            name="email"
            value={contactInfo.email}
            onChange={handleChange}
            disabled={!editing}
            style={inputStyle}
          />
        </label>

        <label style={{ display: "block" }}>
          Corporate Office:
          <textarea
            name="corporateOffice"
            value={contactInfo.corporateOffice}
            onChange={handleChange}
            disabled={!editing}
            rows={3}
            style={inputStyle}
          />
        </label>

        <label style={{ display: "block" }}>
          Regional Office:
          <textarea
            name="regionalOffice"
            value={contactInfo.regionalOffice}
            onChange={handleChange}
            disabled={!editing}
            rows={3}
            style={inputStyle}
          />
        </label>

        <fieldset
          style={{
            border: "1.5px solid #a4d4a5",
            borderRadius: 8,
            padding: 15,
          }}
        >
          <legend style={{ fontWeight: "600", color: "#2c5d30" }}>
            Social Media Links
          </legend>
          {Object.entries(contactInfo.socialMedia).map(([platform, url]) => (
            <div key={platform} style={{ marginBottom: 12 }}>
              <label
                style={{
                  fontWeight: "600",
                  color: "#064420",
                  display: "block",
                }}
              >
                {platform} URL:
                <input
                  type="text"
                  value={url}
                  onChange={(e) => handleSocialChange(platform, e.target.value)}
                  disabled={!editing}
                  placeholder={`Enter ${platform} URL`}
                  style={inputStyle}
                />
              </label>
            </div>
          ))}
        </fieldset>
      </div>

      <div style={{ marginTop: 20, textAlign: "center" }}>
        {!editing ? (
          <>
            <button
              style={buttonStyle("#007bff")}
              onMouseEnter={onButtonHover}
              onMouseLeave={onButtonLeave}
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button
              style={{ ...buttonStyle("#dc3545"), marginLeft: 12 }}
              onMouseEnter={onButtonHover}
              onMouseLeave={onButtonLeave}
              onClick={handleReset}
            >
              Reset
            </button>
          </>
        ) : (
          <>
            <button
              style={buttonStyle("#28a745")}
              onMouseEnter={onButtonHover}
              onMouseLeave={onButtonLeave}
              onClick={handleSave}
            >
              Save
            </button>
            <button
              style={{ ...buttonStyle("#6c757d"), marginLeft: 12 }}
              onMouseEnter={onButtonHover}
              onMouseLeave={onButtonLeave}
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 10,
  marginTop: 6,
  borderRadius: 6,
  border: "1.8px solid #a4d4a5",
  fontSize: 16,
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  boxSizing: "border-box",
  transition: "border-color 0.3s ease",
};

const buttonStyle = (bgColor) => ({
  backgroundColor: bgColor,
  color: "white",
  padding: "12px 26px",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "600",
  fontSize: 16,
  boxShadow: `0 4px 10px ${bgColor}99`,
  transition: "background-color 0.3s ease",
});

export default AdminContact;
