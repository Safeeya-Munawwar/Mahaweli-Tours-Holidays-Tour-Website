import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaComment } from 'react-icons/fa';

const images = [
  '/images/sigiriya1.jpg',
  '/images/hill.PNG',
  '/images/kandy1.PNG',
  '/images/ella2.jpg',
  '/images/galle5.jpg',
];

function Home() {
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [content, setContent] = useState('');
  const [contact, setContact] = useState('');
  const [stats, setStats] = useState([]);

  // Image slideshow state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Comment form state (optional: to collect user input)
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/home-content')
      .then(res => {
        const data = res.data;
        setTitle(data.title || '');
        setIntro(data.intro || '');
        setContent(data.description || '');
        setContact(data.contact || '');
        setStats(Array.isArray(data.stats) ? data.stats : []);
      })
      .catch(err => {
        console.error('Failed to load content', err);
      });
  }, []);

  // Slideshow effect: change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((idx) => (idx + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle comment submit (currently just alerts)
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) {
      alert('Please fill in both name and comment.');
      return;
    }
    // You can add backend integration here later
    alert(`Thanks for your comment, ${commentName}!`);
    setCommentName('');
    setCommentText('');
  };

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif" }}>
      {/* Full-width image slideshow container */}
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '400px',
          overflow: 'hidden',
          marginBottom: '40px',
        }}
      >
        {/* Images stacked absolutely */}
        {images.map((img, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              opacity: index === currentImageIndex ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
              zIndex: index === currentImageIndex ? 2 : 1,
            }}
          />
        ))}

        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 3,
          }}
        />

        {/* Title text centered */}
        <h1
          style={{
            position: 'relative',
            zIndex: 4,
            color: 'white',
            fontSize: '4rem',
            fontWeight: '600',
            fontFamily: "'Dancing Script', cursive",
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0,
            padding: '0 20px',
            textAlign: 'center',
            userSelect: 'none',
          }}
        >
          {title}
        </h1>
      </div>

      {/* Main content inside a centered container */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 20px", fontFamily: "'Montserrat', sans-serif" }}>
        <p style={{ fontSize: "2.25rem", textAlign: "center", color: "#666", marginBottom: "40px" }}>{intro}</p>

        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            marginBottom: "40px",
          }}
        >
          {content
            .split(/\n\s*\n/)   // splits by double line breaks (empty line)
            .map((para, idx) => (
              <p
                key={idx}
                style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#333", marginBottom: "1em" }}
              >
                {para}
              </p>
            ))}
        </div>

        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <p style={{ fontSize: "1.1rem", color: "#444" }}>
            <strong>Contact: </strong>{contact}
          </p>
          <p style={{ fontSize: "1.1rem", color: "#444" }}>
            <strong>Email: </strong> info@mahaweli.lk
          </p>
          <p style={{ fontSize: "1.1rem", color: "#444" }}>
            <strong>Address: </strong> No 15/7, Bernadett Mawatha, Kandana, Sri Lanka
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: "1.75rem", marginBottom: "20px", color: "#333" }}>Our Stats</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {stats.length > 0 ? (
              stats.map((stat, i) => (
                <div
                  key={i}
                  style={{
                    flex: "1 1 200px",
                    backgroundColor: "#f4f9f9",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    transition: "transform 0.3s ease",
                    cursor: "pointer"
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  <strong style={{ fontSize: "2rem", color: "#007BFF" }}>{stat.number}</strong>
                  <p style={{ marginTop: "8px", fontSize: "1.1rem", color: "#555" }}>{stat.label}</p>
                </div>
              ))
            ) : (
              <p>No stats available</p>
            )}
          </div>
        </div>

        {/* Comment Section */}
        <div style={{
          marginTop: "60px",
          padding: "30px",
          backgroundColor: "#eef7f6",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
        }}>
          <h3 style={{ fontSize: "1.75rem", color: "#333", marginBottom: "20px" }}>Leave a Comment</h3>
          
          <form onSubmit={handleCommentSubmit}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
              <FaUser style={{ marginRight: "10px", color: "#007BFF", fontSize: "1.5rem" }} />
              <input
                type="text"
                placeholder="Your Name"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "1rem"
                }}
                required
              />
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "15px" }}>
              <FaComment style={{ marginRight: "10px", marginTop: "8px", color: "#28a745", fontSize: "1.5rem" }} />
              <textarea
                placeholder="Write your comment..."
                rows={4}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                  resize: "vertical"
                }}
                required
              />
            </div>

            <button type="submit" style={{
              backgroundColor: "#064420",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background-color 0.3s"
            }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#096c4f"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#064420"}
            >
              Submit Comment
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Home;
