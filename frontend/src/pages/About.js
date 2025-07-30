import React, { useState, useEffect } from "react";

const LOCALSTORAGE_KEY = "mahaweli_about_data";

function About() {
  const [aboutTexts, setAboutTexts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedData = localStorage.getItem(LOCALSTORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setAboutTexts(parsed.aboutTexts || []);
      setTestimonials(parsed.testimonials || []);
    } else {
      setAboutTexts([
        "Mahaweli Tours & Holidays started in 2009 in Kandy. Our goal is to provide exceptional travel experiences across Sri Lanka with customized packages.",
        "We provide luxury vehicles and experienced guides for sightseeing, adventure tours, cultural visits, and wildlife safaris. We ensure every guest leaves with unforgettable memories.",
      ]);
      setTestimonials([
        {
          id: 1,
          name: "John Smith",
          message: "Excellent service! The trip was smooth and unforgettable!",
          date: "2025-06-15",
        },
        {
          id: 2,
          name: "Maria Gomez",
          message: "Our family loved the tour! Everything was perfectly arranged.",
          date: "2025-07-10",
        },
      ]);
    }
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;

  const testimonialsGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    padding: "60px 40px",
    backgroundColor: "#f9f9f9",
  };

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "40px auto",
        padding: "0 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        animation: "fadeIn 0.8s ease",
      }}
    >
      <h1 style={titleStyle}>The Best Travel Agency</h1>

      <section style={sectionStyle}>
        <h2 style={subTitleStyle}>About Us</h2>
        {aboutTexts.map((text, i) => (
          <p key={i} style={paragraphStyle}>
            {text}
          </p>
        ))}
      </section>


      <section style={sectionStyle}>
        <h2 style={subTitleStyle}>Testimonials</h2>
        <div style={testimonialsGrid}>
          {testimonials.map(({ id, name, message }) => (
            <div key={id} style={testimonialCardStyle} className="testimonial">
              <p style={{ fontStyle: "italic", color: "#444" }}>{message}</p>
              <h4 style={{ marginTop: "10px", color: "#064420" }}>{name}</h4>
            </div>
          ))}
        </div>
      </section>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .testimonial:hover {
            transform: scale(1.02);
            transition: transform 0.25s ease;
          }
        `}
      </style>
    </div>
  );
}

const titleStyle = {
  color: "#065f46",
  textAlign: "center",
  fontSize: "2.6rem",
  fontFamily: "'Dancing Script', cursive",
  marginBottom: 30,
};

const subTitleStyle = {
  fontSize: "1.6rem",
  textAlign: "center",
  color: "#064420",
  marginBottom: 20,
  fontFamily: "'Dancing Script', cursive",
  fontWeight: "600",
};

const paragraphStyle = {
  fontSize: "1.1rem",
  lineHeight: 1.7,
  color: "#333",
  marginBottom: 16,
};

const sectionStyle = {
  marginBottom: 40,
  padding: "24px 20px",
  borderRadius: 12,
  backgroundColor: "#f1f8e9",
  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
};

const testimonialCardStyle = {
  background: "#e0f2f1",
  borderRadius: 10,
  padding: 20,
  boxShadow: "0 3px 8px rgba(0,0,0,0.06)",
  cursor: "pointer",
  transition: "transform 0.3s ease",
};

export default About;
