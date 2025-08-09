import React, { useEffect, useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { jsPDF } from "jspdf";

import QRCode from "qrcode";

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [filter, setFilter] = useState("all"); // all | special | regular
  const [hoveredId, setHoveredId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");


  
  const [bookingForm, setBookingForm] = useState({
    location: "",
    price: 0,
    members: 1,
    total: 0,
    name: "",
    email: "",
    phone: "",
  });

  // Fetch tours data from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/tours").then((res) => {
      setTours(res.data);
    });
  }, []);

  // Lock scroll when booking modal open
  useEffect(() => {
    document.body.style.overflow = bookingId ? "hidden" : "";
  }, [bookingId]);

  // Filter tours based on filter state
  // Update filteredTours:
  const filteredTours = tours.filter((tour) => {
    if (filter === "special" && !tour.isSpecial) return false;
    if (filter === "regular" && tour.isSpecial) return false;
  
    if (
      searchTerm &&
      !tour.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !tour.location.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
  
    return true;
  });

  // Toggle "Read More" for description
  const toggleReadMore = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Open booking modal & prefill form
  const openBookingForm = (tour) => {
    const price = Number(tour.price) || 0;
    setBookingId(tour._id);
    setBookingForm({
      location: tour.location || "",
      price,
      members: 1,
      total: price,
      name: "",
      email: "",
      phone: "",
    });
  };

  // Handle booking form input changes
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

  // Submit booking via emailjs
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

  // Close booking modal
  const closeModal = () => setBookingId(null);
  const generateItineraryPDF = async (tour) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const greenColor = [6, 94, 70];
  
    // Helper to convert image to base64 via canvas
    const loadImageAsDataUrl = (url, format = "PNG") =>
      new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = url;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL(`image/${format.toLowerCase()}`);
          resolve(dataUrl);
        };
        img.onerror = () => resolve(null);
      });
  
    // Add logo
    const logoDataUrl = await loadImageAsDataUrl("/images/logo.PNG", "PNG");
    if (logoDataUrl) {
      doc.addImage(logoDataUrl, "PNG", (pageWidth - 30) / 2, 10, 30, 30);
    }
  
    let y = 45;
  
    // Title
    y += 8;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(...greenColor);
    doc.text("Mahaweli Tours and Holiday", pageWidth / 2, y, { align: "center" });
  
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(80);
    doc.text("Tailored journeys across Sri Lanka with comfort and care.", pageWidth / 2, y, { align: "center" });
    y += 8;

    doc.setDrawColor(...greenColor);
    doc.line(margin, y, pageWidth - margin, y);
    
  
    // Tour title
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(...greenColor);
    doc.text(tour.title, margin, y);
    y += 8;
  
    // Tour image
    const tourImageUrl = `http://localhost:5000${tour.imageUrl}`;
    const tourImageDataUrl = await loadImageAsDataUrl(tourImageUrl, "JPEG");
    if (tourImageDataUrl) {
      doc.addImage(tourImageDataUrl, "JPEG", margin, y, pageWidth - 2 * margin, 50);
      y += 55;
    }
  
    y += 8;

    // Overview
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...greenColor);
    doc.text("Tour Overview", margin, y);
    y += 6;
  
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(30);
    const details = [
      `Title: ${tour.title || "N/A"}`,
      `Location: ${tour.location || "N/A"}`,
      `Duration: ${tour.duration || "N/A"}`,
      `Price per Person: LKR ${tour.price || 0}`,
      `Members: ${tour.members || 1}`,
      `Total Price: LKR ${tour.total || tour.price || 0}`,
    ];
    details.forEach((line) => {
      doc.text(line, margin, y);
      y += 5;
    });
  
    y += 8;
  
    // Description
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...greenColor);
    doc.text("Description", margin, y);
    y += 6;
  
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(30);
    const descLines = doc.splitTextToSize(tour.description || "No description", pageWidth - 2 * margin);
    doc.text(descLines, margin, y);
    y += descLines.length * 5;
  
    y += 6;
  
    // Contact
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 102, 204);
    doc.textWithLink("Contact Number: +94 77 711 1553", margin, y, {
      url: "tel:+94777111553",
    });
    y += 6;
    doc.textWithLink("Email: info@mahawelitours.com", margin, y, {
      url: "mailto:info@mahawelitours.com",
    });
  
    y += 12;
  
    // QR Code
    const qrDataUrl = await QRCode.toDataURL("https://mahawelitours.com");
    doc.setFont("helvetica", "normal");
    doc.setTextColor(30);
    doc.text("Scan for more info:", margin, y);
    y += 6;
    doc.addImage(qrDataUrl, "PNG", margin, y, 30, 30);
  
    // Thank you
    y += 40;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...greenColor);
    doc.text("Thank you for choosing Mahaweli Tours and Holiday!", pageWidth / 2, y, { align: "center" });
  
    const fileName = `${(tour.title || "Itinerary").replace(/\s+/g, "_")}_Itinerary.pdf`;
    doc.save(fileName);
  };
  

  // Styles (same as you provided)
  const containerStyle = {
    padding: 40,
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f9f9f9",
    maxWidth: 1200,
    margin: "0 auto",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 24,
    marginBottom: 30,
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
    transition: "0.3s",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
    marginTop: 8,
  };

  const itineraryButton = {
    backgroundColor: "#1a73e8",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
    width: "100%",
    marginTop: 8,
  };

  const filterButton = {
    backgroundColor: "#2c5d30",
    width: 300,
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
    marginBottom: "30px",
  };

  const filterButtonActive = {
    ...filterButton,
    backgroundColor: "#ffa500",
  };

  const specialBadgeStyle = {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#FFA500",
    color: "white",
    padding: "5px 10px",
    borderRadius: 5,
    fontWeight: "bold",
    fontSize: "0.9rem",
    zIndex: 1,
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

  return (
    <div style={containerStyle}>
           
{/* Search Input with Icon */}
<div
  style={{
    position: "relative",
    maxWidth: 400,
    margin: "0 0 30px auto", // right align container with auto left margin
    width: "100%",
  }}
>

  <input
    type="text"
    placeholder="Search tours by title..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      width: "100%",
      padding: "10px 40px 10px 15px", // extra right padding for icon
      fontSize: "1rem",
      borderRadius: 8,
      border: "1px solid #ccc",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      outline: "none",
      boxSizing: "border-box",
    }}
  />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#888"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      position: "absolute",
      right: 12,
      top: "50%",
      transform: "translateY(-50%)",
      width: 20,
      height: 20,
      pointerEvents: "none",
    }}
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
</div>

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

      {/* Filter Buttons */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <button
          onClick={() => setFilter("all")}
          style={filter === "all" ? filterButtonActive : filterButton}
        >
          All
        </button>
        <button
          onClick={() => setFilter("special")}
          style={filter === "special" ? filterButtonActive : filterButton}
        >
          Special Tours
        </button>
        <button
          onClick={() => setFilter("regular")}
          style={filter === "regular" ? filterButtonActive : filterButton}
        >
          Regular Tours
        </button>
      </div>

      {/* Tours Grid */}
      <div style={gridStyle}>
        {filteredTours.map((tour) => (
          <div key={tour._id} style={cardStyle}>
            <div style={{ position: "relative" }}>
              {tour.isSpecial && (
                <div style={specialBadgeStyle}>⭐ Special</div>
              )}
              <img
  src={`http://localhost:5000${tour.imageUrl}`}
  alt={tour.title}
  style={{
    ...imageStyle,
    transform: hoveredId === tour._id ? "scale(1.05)" : "scale(1)",
    transition: "transform 0.3s ease",
    cursor: "pointer",
    boxShadow: hoveredId === tour._id ? "0 8px 15px rgba(6, 94, 70, 0.3)" : "none",
    position: hoveredId === tour._id ? "relative" : "static",
    zIndex: hoveredId === tour._id ? 2 : 1,
  }}
  onMouseEnter={() => setHoveredId(tour._id)}
  onMouseLeave={() => setHoveredId(null)}
/>

            </div>

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

            <button onClick={() => openBookingForm(tour)} style={bookButton}>
              Book Now
            </button>
            <button
              onClick={() => generateItineraryPDF(tour)}
              style={itineraryButton}
            >
              Download Itinerary PDF
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
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

export default Tours;
