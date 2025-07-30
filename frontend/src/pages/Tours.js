import React, { useEffect, useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    location: "",
    price: 0,
    members: 1,
    total: 0,
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/tours").then((res) => {
      setTours(res.data);
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = bookingId ? "hidden" : "";
  }, [bookingId]);

  const toggleReadMore = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const openBookingForm = (tour) => {
    const price = Number(tour.price); // Convert to number
  
    setBookingId(tour._id);
    setBookingForm({
      location: tour.location || "",
      price: price || 0,        // Safe fallback if invalid
      members: 1,
      total: price || 0,
      name: "",
      email: "",
      phone: "",
    });
  };
  
  
  
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    let newForm = { ...bookingForm, [name]: value };
  
    if (name === "members") {
      const membersNum = parseInt(value) || 1;
      const priceNum = Number(bookingForm.price) || 0;
      newForm.members = membersNum;
      newForm.total = membersNum * priceNum;
    }
  
    setBookingForm(newForm);
  };
   

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      tour_location: bookingForm.location,
      tour_price: bookingForm.price,
      members: bookingForm.members,
      total_price: bookingForm.total,
      user_name: bookingForm.name,
      user_email: bookingForm.email,
      user_phone: bookingForm.phone,
    };

    emailjs
      .send(
        "service_4738ygi",
        "template_1t1ssv1",
        templateParams,
        "V6ZMioOe9GnndO1Y-"
      )
      .then(
        () => {
          alert("Booking sent successfully! We'll contact you soon. Thank You!");
          setBookingId(null);
        },
        (error) => {
          alert("Failed to send booking. Please try again.");
          console.error(error);
        }
      );
  };

  const closeModal = () => setBookingId(null);

  return (
    <div style={containerStyle}>
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
        Handpicked Tours across Sri Lanka
      </h2>

      <div style={gridStyle}>
        {tours.map((tour) => (
          <div key={tour._id} style={cardStyle}>
            <img
              src={`http://localhost:5000${tour.imageUrl}`}
              alt={tour.title}
              style={imageStyle}
            />
             <h3 style={{ margin: "10px 0 5px", color: "#2c5d30", fontSize: "1.8rem" }}>{tour.title}</h3>
            <p style={infoStyle}>
              📍 <strong>Location: </strong> {tour.location}
            </p>
            <p style={infoStyle}>
              ⏱ <strong>Duration: </strong> {tour.duration}
            </p>
            <p style={infoStyle}>
            ⭐ <strong>Rating: </strong> 
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} style={{ color: i < tour.rating ? "#ffc107" : "#ddd", fontSize: "1.1rem" }}>
                  ★
                </span>
              ))}
            </p>
            <p style={descriptionStyle}>
              {expandedId === tour._id
                ? tour.description
                : tour.description?.slice(0, 100) +
                  (tour.description?.length > 100 ? "..." : "")}
              {tour.description?.length > 100 && (
                <button
                  onClick={() => toggleReadMore(tour._id)}
                  style={readMoreButton}
                >
                  {expandedId === tour._id ? "Show Less" : "Read More"}
                </button>
              )}
            </p>
            <button
              onClick={() => openBookingForm(tour)}
              style={bookButton}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {bookingId && (
        <div style={modalOverlay} onClick={closeModal}>
<form
  onClick={(e) => e.stopPropagation()}
  onSubmit={handleBookingSubmit}
  style={modalForm}
>
  <h3 style={{ marginBottom: 10 }}>Book Your Tour</h3>

  <label style={labelStyle}>Location</label>
  <input value={bookingForm.location} readOnly style={inputStyle} />

  <label style={labelStyle}>Price per Person (LKR)</label>
  <input value={bookingForm.price} readOnly style={inputStyle} />

  <label style={labelStyle}>Number of Members</label>
  <input
    type="number"
    name="members"
    value={bookingForm.members}
    onChange={handleBookingChange}
    min="1"
    required
    style={inputStyle}
  />

  <label style={labelStyle}>Total Amount (LKR)</label>
  <input value={bookingForm.total} readOnly style={inputStyle} />

  <label style={labelStyle}>Your Name</label>
  <input
    type="text"
    name="name"
    value={bookingForm.name}
    onChange={handleBookingChange}
    required
    style={inputStyle}
  />

  <label style={labelStyle}>Your Email</label>
  <input
    type="email"
    name="email"
    value={bookingForm.email}
    onChange={handleBookingChange}
    required
    style={inputStyle}
  />

  <label style={labelStyle}>Your Phone</label>
  <input
    type="tel"
    name="phone"
    value={bookingForm.phone}
    onChange={handleBookingChange}
    required
    style={inputStyle}
  />

  <button type="submit" style={submitButton}>
    Confirm Booking
  </button>
  <button type="button" onClick={closeModal} style={cancelButton}>
    Cancel
  </button>
</form>

        </div>
      )}
    </div>
  );
};

// Styles
const containerStyle = {
  padding: 40,
  fontFamily: "'Segoe UI', sans-serif",
  backgroundColor: "#f9f9f9",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: 24,
};

const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: 12,
  padding: 16,
  boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
  transition: "0.3s",
};

const imageStyle = {
  width: "100%",
  height: 180,
  objectFit: "cover",
  borderRadius: 8,
};

const infoStyle = {
  fontSize: "1rem",
  color: "#555",
  marginBottom: 4,
};

const descriptionStyle = {
  fontSize: "1rem",
  color: "#444",
  marginBottom: 12,
};

const readMoreButton = {
  background: "none",
  border: "none",
  color: "#0077cc",
  cursor: "pointer",
  fontSize: "0.9rem",
};

const bookButton = {
  backgroundColor: "#065f46",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: 6,
  cursor: "pointer",
  width: "100%",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalForm = {
  backgroundColor: "#fff",
  padding: 20,
  borderRadius: 12,
  width: 600,
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  display: "flex",
  flexDirection: "column",
};

const inputStyle = {
  padding: 10,
  marginBottom: 10,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const submitButton = {
  padding: 10,
  backgroundColor: "#065f46",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const labelStyle = {
  fontWeight: "bold",
  marginBottom: 4,
};


const cancelButton = {
  padding: 10,
  marginTop: 8,
  backgroundColor: "#ccc",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

export default Tours;
