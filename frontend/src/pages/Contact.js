import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaYoutube,
  FaTripadvisor,
  FaPinterest,
  FaInstagram,
  FaGoogle,
} from "react-icons/fa";

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

const socialMediaMap = {
  Facebook: { icon: <FaFacebook /> },
  Youtube: { icon: <FaYoutube /> },
  Tripadvisor: { icon: <FaTripadvisor /> },
  Pinterest: { icon: <FaPinterest /> },
  Instagram: { icon: <FaInstagram /> },
  Google: { icon: <FaGoogle /> },
};

function Contact() {
  const [contactInfo, setContactInfo] = useState(initialContactInfo);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LOCALSTORAGE_KEY);
    if (saved) {
      setContactInfo(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div
      style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: 30,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#2c3e50",
        lineHeight: 1.6,
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
        Plan Your Adventure with Mahaweli
      </h2>

      <div style={{ marginBottom: 25, fontSize: 18 }}>
        <p>
          <strong>📞 Phone:</strong> {contactInfo.phone}
        </p>
        <p>
          <strong>📧 Email:</strong> {contactInfo.email}
        </p>
        <p>
          <strong>🏢 Corporate Office:</strong> {contactInfo.corporateOffice}
        </p>
        <p>
          <strong>🏢 Regional Office:</strong> {contactInfo.regionalOffice}
        </p>
      </div>

      <div style={{ marginBottom: 35 }}>
        <strong style={{ fontSize: 20 }}>Follow us on:</strong>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            marginTop: 12,
            fontSize: 32,
          }}
        >
          {Object.entries(contactInfo.socialMedia).map(([platform, url]) => {
            const { icon } = socialMediaMap[platform] || {};
            return (
              icon && (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={platform}
                  style={{
                    color: "#064420",
                    transition: "all 0.25s ease",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.25)";
                    e.currentTarget.style.color = "#1b5e20";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.color = "#064420";
                  }}
                >
                  {icon}
                </a>
              )
            );
          })}
        </div>
      </div>

      <hr style={{ margin: "50px 0", borderColor: "#ddd" }} />

      <h2
        style={{
          fontSize: "2rem",
          color: "#064420",
          marginBottom: 20,
          fontWeight: "600",
        }}
      >
        Send Us a Message
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          fontSize: 18,
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
          style={{ ...inputStyle, resize: "vertical" }}
        />
        <button type="submit" style={buttonStyle}>
          Send
        </button>
        {submitted && (
          <p style={{ color: "green", marginTop: 14, fontWeight: "600" }}>
            ✅ Thank you! We'll get back to you soon.
          </p>
        )}
      </form>

      <hr style={{ margin: "50px 0", borderColor: "#ddd" }} />

      <h2
        style={{
          marginBottom: 15,
          fontSize: "2rem",
          color: "#064420",
          fontWeight: "600",
        }}
      >
        Find Us on the Map
      </h2>
      <div
        style={{
          width: "100%",
          height: 420,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        }}
      >
        <iframe
          title="Mahaweli Sales Office Kandy"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1989.364006651888!2d80.6295318!3d7.3175933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae367bb3f3b51ad%3A0x88d18ad28050e23c!2sMahaweli%20Tours%20%26%20Holidays%20-%20Sales%20office%20Kandy!5e0!3m2!1sen!2slk!4v1722251260000!5m2!1sen!2slk"
        ></iframe>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "14px 12px",
  borderRadius: 8,
  border: "1.8px solid #bbb",
  fontSize: 18,
  color: "#2c3e50",
  outline: "none",
  transition: "border-color 0.3s ease",
};

const buttonStyle = {
  padding: "14px 24px",
  background: "#064420",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "700",
  fontSize: 18,
  transition: "background-color 0.3s ease",
};

export default Contact;
