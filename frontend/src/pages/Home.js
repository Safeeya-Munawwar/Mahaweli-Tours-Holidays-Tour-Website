import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaUser,
  FaComment,
  FaHome,
  FaStar,
  FaImages,
  FaBlog,
  FaPenFancy,
  FaInfoCircle,
  FaEnvelope,
} from 'react-icons/fa';

const navCards = [
  { 
    text: <><FaHome style={{ marginRight: '8px' }} /> Home</>, 
    label: 'Back to Home Page', 
    link: '/' 
  },
  { 
    text: <><FaStar style={{ marginRight: '8px' }} /> Tour Packages</>, 
    label: 'Explore our tours', 
    link: '/Tours' 
  },
  { 
    text: <><FaImages style={{ marginRight: '8px' }} /> Gallery</>, 
    label: 'Our Memories', 
    link: '/Gallery' 
  },
  { 
    text: <><FaPenFancy style={{ marginRight: '8px' }} /> Blog</>, 
    label: 'Tips & Stories', 
    link: '/Blog' 
  },
  { 
    text: <><FaInfoCircle style={{ marginRight: '8px' }} /> About</>, 
    label: 'Learn more about us', 
    link: '/About' 
  },
  { 
    text: <><FaEnvelope style={{ marginRight: '8px' }} /> Contact</>, 
    label: 'Get in touch with us', 
    link: '/Contact' 
  },
];


// Slideshow images
const images = [
  '/images/sigiriya1.jpg',
  '/images/hill.PNG',
  '/images/kandy1.PNG',
  '/images/ella2.jpg',
  '/images/galle5.jpg',
];

function Home() {
  // State variables for content
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [content, setContent] = useState('');
  const [contact, setContact] = useState('');
  const [stats, setStats] = useState([]);

  // UI state variables
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Data state variables
  const [popularTours, setPopularTours] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);

  // Loading & error states
  const [loadingContent, setLoadingContent] = useState(true);
  const [loadingTours, setLoadingTours] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  const [errorContent, setErrorContent] = useState(null);
  const [errorTours, setErrorTours] = useState(null);
  const [errorBlogs, setErrorBlogs] = useState(null);

  useEffect(() => {
    // Fetch homepage content
    axios
      .get('http://localhost:5000/api/home-content')
      .then((res) => {
        const data = res.data || {};
        setTitle(data.title || 'Mahaweli Tours & Holidays');
        setIntro(data.intro || '');
        setContent(data.description || '');
        setContact(data.contact || '');
        setStats(Array.isArray(data.stats) ? data.stats : []);
        setLoadingContent(false);
      })
      .catch((err) => {
        console.error('Failed to load home content:', err);
        setErrorContent('Failed to load home content');
        setLoadingContent(false);
      });

    // Fetch tours
    axios
      .get('http://localhost:5000/api/tours')
      .then((res) => {
        const toursData = res.data || [];
        const popular = toursData.filter((t) => t.isSpecial).slice(0, 3);
        setPopularTours(popular);
        setLoadingTours(false);
      })
      .catch((err) => {
        console.error('Failed to fetch tours:', err);
        setErrorTours('Failed to fetch tours');
        setLoadingTours(false);
      });

    // Fetch blogs
    axios
      .get('http://localhost:5000/api/blogs')
      .then((res) => {
        const blogsData = res.data || [];
        const latest = blogsData.slice(0, 3);
        setLatestBlogs(latest);
        setLoadingBlogs(false);
      })
      .catch((err) => {
        console.error('Failed to fetch blogs:', err);
        setErrorBlogs('Failed to fetch blogs');
        setLoadingBlogs(false);
      });
  }, []);

  // Slideshow timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((idx) => (idx + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Comment submit handler
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) {
      alert('Please fill in both name and comment.');
      return;
    }
    alert(`Thanks for your comment, ${commentName}!`);
    setCommentName('');
    setCommentText('');
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      {/* Slideshow */}
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '400px',
          overflow: 'hidden',
          marginBottom: '40px',
        }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: index === currentImageIndex ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
              zIndex: index === currentImageIndex ? 2 : 1,
            }}
          />
        ))}

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 3,
          }}
        />

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

        {/* Navigation Cards on slideshow bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 1,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            zIndex: 5,
            padding: '0 10px',
            maxWidth: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {navCards.map((card, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  position: 'relative',
                  width: '260px',
                  height: '130px',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  userSelect: 'none',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => (window.location.href = card.link)}
                title={card.text}
              >
                {/* Icon */}
                <div
                  style={{
                    position: 'absolute',
                    top: '30%',
                    left: '20px',
                    fontSize: '2rem',
                    color: 'white',
                    zIndex: 10,
                  }}
                >
                  {card.icon}
                </div>

                {/* Text label bar */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(1, 50, 32, 0.6)',
                    background: '#013220',
                    padding: '10px',
                    border: '2px solid white',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    textAlign: 'center',
                    pointerEvents: 'none',
                  }}
                >
                  {card.text}
                </div>

                {/* Hover overlay label */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(1, 50, 32, 0.1)',
                    backdropFilter: 'blur(20px)',
                    overflow: 'hidden',
                    width: '100%',
                    height: isHovered ? '100%' : '0',
                    transition: 'height 0.7s ease',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    textAlign: 'center',
                    pointerEvents: isHovered ? 'auto' : 'none',
                    padding: '0 10px',
                    zIndex: 11,
                  }}
                >
                  {card.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main content container */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        {loadingContent ? (
          <p style={{ textAlign: 'center' }}>Loading content...</p>
        ) : errorContent ? (
          <p style={{ color: 'red', textAlign: 'center' }}>{errorContent}</p>
        ) : (
          <>
            <p
              style={{
                fontSize: '2.25rem',
                textAlign: 'center',
                color: '#666',
                marginBottom: '40px',
              }}
            >
              {intro}
            </p>

            <div
              style={{
                backgroundColor: '#f8f9fa',
                padding: '25px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                marginBottom: '40px',
              }}
            >
              {content.split(/\n\s*\n/).map((para, idx) => (
                <p
                  key={idx}
                  style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#333', marginBottom: '1em' }}
                >
                  {para}
                </p>
              ))}
            </div>
          </>
        )}

        {/* Popular Tours Section */}
        <div style={{ padding: '40px 20px', backgroundColor: '#f0f8ff' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '30px' }}>
            <FaStar style={{ marginRight: 10 }} /> Popular Tours
          </h2>
          {loadingTours ? (
            <p style={{ textAlign: 'center' }}>Loading tours...</p>
          ) : errorTours ? (
            <p style={{ color: 'red', textAlign: 'center' }}>{errorTours}</p>
          ) : popularTours.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No popular tours found.</p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
              {popularTours.map((tour, idx) => (
                <div
                  key={tour._id || idx}
                  style={{
                    width: '200px',
                    background: 'white',
                    padding: '15px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <img
                    src={tour.imageUrl || tour.image || '/images/default-tour.jpg'}
                    alt={tour.title || tour.name || 'Tour Image'}
                    style={{ width: '100%', height: '180px', borderRadius: '6px', objectFit: 'cover' }}
                  />
                  <h3 style={{ fontSize: '1.2rem', marginTop: '10px' }}>{tour.title || tour.name}</h3>
                  <p style={{ color: '#555' }}>{tour.shortDescription || tour.description || ''}</p>
                  <button
                    onClick={() => (window.location.href = `/Tours/${tour._id}`)}
                    style={{
                      marginTop: '10px',
                      backgroundColor: '#064420',
                      color: 'white',
                      border: 'none',
                      padding: '10px 15px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Latest Blogs Section */}
        <div style={{ padding: '40px 20px', backgroundColor: '#fff' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '30px' }}>
            <FaBlog style={{ marginRight: 10 }} /> Latest from Our Blog
          </h2>
          {loadingBlogs ? (
            <p style={{ textAlign: 'center' }}>Loading blogs...</p>
          ) : errorBlogs ? (
            <p style={{ color: 'red', textAlign: 'center' }}>{errorBlogs}</p>
          ) : latestBlogs.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No blogs available.</p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
              {latestBlogs.map((blog, idx) => (
                <div
                  key={blog._id || idx}
                  style={{
                    width: '200px',
                    background: '#f9f9f9',
                    padding: '15px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  }}
                >
                  {blog.imageUrl && (
                    <img
                      src={blog.imageUrl.startsWith('http') ? blog.imageUrl : `http://localhost:5000${blog.imageUrl}`}
                      alt={blog.title}
                      style={{
                        width: '100%',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        marginBottom: '10px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                      }}
                    />
                  )}

                  <h3 style={{ fontSize: '1.1rem' }}>{blog.title}</h3>
                  <p style={{ color: '#666', fontSize: '0.95rem' }}>
                    {blog.snippet || blog.summary || ''}
                  </p>
                  <button
                    onClick={() => (window.location.href = `/Blog/${blog._id}`)}
                    style={{
                      marginTop: '10px',
                      backgroundColor: '#007BFF',
                      color: 'white',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Read More
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', color: '#444' }}>
            <strong>Contact: </strong>
            {contact || 'Not available'}
          </p>
          <p style={{ fontSize: '1.1rem', color: '#444' }}>
            <strong>Email: </strong> info@mahaweli.lk
          </p>
          <p style={{ fontSize: '1.1rem', color: '#444' }}>
            <strong>Address: </strong> No 15/7, Bernadett Mawatha, Kandana, Sri Lanka
          </p>
        </div>

        {/* Stats Section */}
        <div>
          <h3 style={{ fontSize: '1.75rem', marginBottom: '20px', color: '#333' }}>Our Stats</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {stats.length > 0 ? (
              stats.map((stat, i) => (
                <div
                  key={i}
                  style={{
                    flex: '1 1 200px',
                    backgroundColor: '#f4f9f9',
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <strong style={{ fontSize: '2rem', color: '#007BFF' }}>{stat.number}</strong>
                  <p style={{ marginTop: '8px', fontSize: '1.1rem', color: '#555' }}>{stat.label}</p>
                </div>
              ))
            ) : (
              <p>No stats available</p>
            )}
          </div>
        </div>

        {/* Comment Section */}
        <div
          style={{
            marginTop: '60px',
            padding: '30px',
            backgroundColor: '#eef7f6',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ fontSize: '1.75rem', color: '#333', marginBottom: '20px' }}>Leave a Comment</h3>

          <form onSubmit={handleCommentSubmit}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <FaUser style={{ marginRight: '10px', color: '#007BFF', fontSize: '1.5rem' }} />
              <input
                type="text"
                placeholder="Your Name"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  fontSize: '1rem',
                }}
                required
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
              <FaComment
                style={{ marginRight: '10px', marginTop: '8px', color: '#28a745', fontSize: '1.5rem' }}
              />
              <textarea
                placeholder="Write your comment..."
                rows={4}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  fontSize: '1rem',
                  resize: 'vertical',
                }}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#064420',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#096c4f')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#064420')}
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
