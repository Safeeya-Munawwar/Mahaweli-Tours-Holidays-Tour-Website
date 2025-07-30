import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/tours", label: "Tour Packages" },
    { to: "/gallery", label: "Gallery" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const linkStyle = (to) => ({
    textDecoration: "none",
    color: location.pathname === to ? "#009688" : "#004d4d",
    padding: "10px 16px",
    fontWeight: 600,
    fontSize: "18px",
    transition: "all 0.3s ease",
    borderBottom: location.pathname === to ? "2px solid #009688" : "2px solid transparent",
  });

  const adminButtonStyle = {
    backgroundColor: "#ff7043",
    color: "#ffffff",
    padding: "10px 18px",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "16px",
    textDecoration: "none",
    border: "none",
    transition: "background-color 0.3s ease",
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "#f4f9f9",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 32px",
        boxShadow: "0 3px 8px rgba(0,0,0,0.05)",
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img
          src="/images/logo.PNG"
          alt="Mahaweli Logo"
          style={{ height: 48, width: "auto", marginRight: 10 }}
        />
        <span style={{ color: "#004d4d", fontSize: "20px", fontWeight: 700 }}>
          Mahaweli Tours
        </span>
      </Link>

      {/* Desktop Nav */}
      <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            style={linkStyle(to)}
            onMouseEnter={(e) => {
              e.target.style.color = "#009688";
              e.target.style.borderBottom = "2px solid #009688";
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== to) {
                e.target.style.color = "#004d4d";
                e.target.style.borderBottom = "2px solid transparent";
              }
            }}
          >
            {label}
          </Link>
        ))}
        <Link
          to="/admin-login"
          style={adminButtonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#f4511e")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff7043")}
        >
          Admin
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <div
        className="hamburger"
        onClick={toggleMenu}
        style={{
          display: "none",
          flexDirection: "column",
          cursor: "pointer",
          gap: 5,
        }}
      >
        <span style={{ width: 25, height: 3, backgroundColor: "#004d4d", borderRadius: 2 }}></span>
        <span style={{ width: 25, height: 3, backgroundColor: "#004d4d", borderRadius: 2 }}></span>
        <span style={{ width: 25, height: 3, backgroundColor: "#004d4d", borderRadius: 2 }}></span>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: 75,
            right: 20,
            backgroundColor: "#ffffff",
            borderRadius: 8,
            padding: "20px",
            boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            alignItems: "flex-start",
          }}
        >
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "#004d4d",
                textDecoration: "none",
                fontSize: "16px",
                padding: "6px 10px",
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/admin-login"
            onClick={() => setMenuOpen(false)}
            style={{
              ...adminButtonStyle,
              width: "100%",
              textAlign: "center",
              padding: "8px 12px",
            }}
          >
            Admin
          </Link>
        </div>
      )}

      {/* Responsive CSS */}
      <style>
        {`
          @media (max-width: 768px) {
            .desktop-nav {
              display: none;
            }
            .hamburger {
              display: flex !important;
            }
          }
        `}
      </style>
    </nav>
  );
}

export default Navbar;
