import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ include useNavigate
import { FaUserCircle, FaArrowLeft} from "react-icons/fa";


const API_BASE = 'http://localhost:5000';

const BlogDetail = () => {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/blogs/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.error("Failed to fetch blog post", err);
        setPost(null);
      }
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    if (!postId) return;
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/comments/${postId}`);
        setComments(res.data);
      } catch (err) {
        console.error('Failed to fetch comments:', err);
      }
    };
    fetchComments();
  }, [postId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.message) {
      setError('Please fill all fields');
      return;
    }
    if (!postId) {
      setError('Invalid post ID');
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API_BASE}/api/comments`, {
        postId,
        name: form.name,
        email: form.email,
        message: form.message,
      });

      setForm({ name: '', email: '', message: '' });

      const res = await axios.get(`${API_BASE}/api/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.error('Failed to post comment:', err);
      if (err.response?.data?.message) {
        setError(`Error: ${err.response.data.message}`);
      } else {
        setError('Failed to post comment');
      }
    }

    setLoading(false);
  };

  if (!post) {
    return (
      <div style={styles.notFoundContainer}>
        <h2 style={styles.notFoundTitle}>Blog not found</h2>
        <p>If you're looking for something specific, please call us at:</p>
        <p style={styles.contactNumber}>+94 777 111553</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
  <button
    onClick={() => navigate('/blog')}
    style={{
      background: 'transparent',
      border: 'none',
      color: '#064420',
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <FaArrowLeft style={{ marginRight: 6 }} />
    Back to Blog
  </button>
  {/* Optional X button on the right */}
  {/* <FaTimes onClick={() => navigate('/blog')} style={{ cursor: 'pointer', color: '#900', fontSize: 20 }} /> */}
</div>

      <h1 style={styles.title}>{post.title}</h1>

      {post.imageUrl && (
        <img
          src={`http://localhost:5000${post.imageUrl}`}
          alt={post.title}
          style={styles.postImage}
        />
      )}

      <p style={styles.content}>{post.content}</p>

      <h2 style={styles.commentsHeading}>Comments</h2>

      <form onSubmit={handleSubmit} style={styles.commentForm}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
          onFocus={(e) => (e.target.style.borderColor = '#064420')}
          onBlur={(e) => (e.target.style.borderColor = '#ccc')}
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
          onFocus={(e) => (e.target.style.borderColor = '#064420')}
          onBlur={(e) => (e.target.style.borderColor = '#ccc')}
        />
        <textarea
          name="message"
          placeholder="Your comment"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          style={styles.textarea}
          onFocus={(e) => (e.target.style.borderColor = '#064420')}
          onBlur={(e) => (e.target.style.borderColor = '#ccc')}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.submitButton,
            cursor: loading ? 'not-allowed' : 'pointer',
            backgroundColor: loading ? '#4b6b4a' : '#064420',
          }}
          onMouseOver={(e) => {
            if (!loading) e.target.style.backgroundColor = '#056232';
          }}
          onMouseOut={(e) => {
            if (!loading) e.target.style.backgroundColor = '#064420';
          }}
        >
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
        {error && <p style={styles.errorText}>{error}</p>}
      </form>

      <div>
     
{comments.length === 0 ? (
  <p style={styles.noComments}>No comments yet. Be the first to comment!</p>
) : (
  comments.map((c) => (
    <div key={c._id} style={styles.commentCard}>
      <p style={styles.commentName}>
        <FaUserCircle style={{ verticalAlign: "middle", marginRight: 6, color: "#064420" }} />
        {c.name}{' '}
        <span style={styles.commentDate}>
          ({new Date(c.createdAt).toLocaleString()})
        </span>
      </p>
      <p style={styles.commentMessage}>

        {c.message}
      </p>
    </div>
  ))
)}

      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 800,
    margin: '30px auto',
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: '2.8rem',
    marginBottom: '1rem',
    color: '#064420',
    fontFamily: "'Great Vibes', cursive",
    textAlign: 'center',
    userSelect: 'none',
  },
  postImage: {
    width: '100%',
    borderRadius: 12,
    marginBottom: 25,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  content: {
    fontSize: '1.1rem',
    lineHeight: 1.8,
    marginBottom: 40,
    color: '#333',
    whiteSpace: 'pre-wrap',
  },
  commentsHeading: {
    marginBottom: 16,
    color: '#064420',
    fontWeight: '600',
  },
  commentForm: {
    marginBottom: 40,
    padding: 20,
    borderRadius: 10,
    background: '#f5f7f6',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 16,
    transition: 'border-color 0.3s ease',
  },
  textarea: {
    width: '100%',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 16,
    transition: 'border-color 0.3s ease',
    resize: 'vertical',
  },
  submitButton: {
    padding: '12px 24px',
    fontSize: 16,
    backgroundColor: '#064420',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    transition: 'background 0.3s ease',
  },
  errorText: {
    color: 'crimson',
    marginTop: 12,
    fontWeight: '600',
  },
  noComments: {
    fontStyle: 'italic',
    color: '#555',
  },
  commentCard: {
    borderBottom: '1px solid #ccc',
    paddingBottom: 10,
    marginBottom: 20,
  },
  commentName: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: 16,
  },
  commentDate: {
    fontWeight: 'normal',
    color: '#555',
    fontSize: 14,
  },
  commentMessage: {
    marginTop: 6,
    marginRight: 10,
    whiteSpace: 'pre-wrap',
    fontSize: 14,
  },
  notFoundContainer: {
    padding: 40,
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  notFoundTitle: {
    color: 'crimson',
    marginBottom: 10,
  },
  contactNumber: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
};

export default BlogDetail;
