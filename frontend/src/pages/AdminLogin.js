import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ADMIN_USERNAME = "mahaweli";
const ADMIN_PASSWORD = "mahaweli553";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin-dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "100px auto",
        padding: 30,
        backgroundColor: "#e6f4ea",
        border: "2px solid #4CAF50",
        borderRadius: 8,
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ color: "#2e7d32", marginBottom: 8, textAlign: "center" }}>
        Admin Login
      </h2>
      <p
        style={{
          fontSize: 14,
          color: "#2e7d32",
          marginBottom: 24,
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        Please enter your admin credentials below to access the dashboard and
        manage site content.
      </p>

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="username"
          style={{
            display: "block",
            marginBottom: 6,
            fontWeight: "bold",
            color: "#2e7d32",
          }}
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (error) setError("");
          }}
          required
          style={{
            lineHeight: 1.4,
            width: 575,
            padding: 12,
            borderRadius: 4,
            border: "1px solid #4CAF50",
            fontSize: 16,
            outline: "none",
            transition: "border-color 0.3s",
          }}
        />

        <label
          htmlFor="password"
          style={{
            display: "block",
            marginTop: 20,
            marginBottom: 6,
            fontWeight: "bold",
            color: "#2e7d32",
          }}
        >
          Password
        </label>
        <div style={{ position: "relative" }}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
            required
            style={{
              lineHeight: 1.4,
              width: 575,
              padding: 12,
              borderRadius: 4,
              border: "1px solid #4CAF50",
              fontSize: 16,
              outline: "none",
              transition: "border-color 0.3s",
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            style={toggleButtonStyle}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>

        {error && (
          <p style={{ color: "#d32f2f", marginTop: 12, fontWeight: "bold" }}>
            {error}
          </p>
        )}

        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
    </div>
  );
}


const buttonStyle = {
  width: "100%",
  padding: 12,
  marginTop: 24,
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: 16,
  transition: "background-color 0.3s ease",
};

const toggleButtonStyle = {
  position: "absolute",
  top: "50%",
  right: 20,
  transform: "translateY(-50%)",
  background: "transparent",
  border: "none",
  color: "#4CAF50",
  cursor: "pointer",
  fontWeight: "bold",
  padding: 0,
};

export default AdminLogin;
