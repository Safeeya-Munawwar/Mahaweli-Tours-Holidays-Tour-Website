import React from "react";
import { Link, useLocation } from "react-router-dom";

const sidebarStyle = {
  width: "220px",
  background: "linear-gradient(180deg, #064420 0%, #0a6a3d 100%)",
  color: "#fff",
  padding: "25px 20px",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  zIndex: 1000,
};

const logoStyle = {
  fontSize: "1.8rem",
  fontWeight: "700",
  marginBottom: "40px",
  textAlign: "center",
  letterSpacing: "0.1em",
  userSelect: "none",
  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
};

const navListStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  flexGrow: 1,
};

const linkStyle = {
  display: "block",
  padding: "12px 18px",
  marginBottom: "12px",
  color: "#c5e1a5",
  textDecoration: "none",
  borderRadius: "6px",
  fontWeight: "500",
  fontSize: "1.05rem",
  transition: "background-color 0.25s ease, color 0.25s ease",
  userSelect: "none",
};

const activeLinkStyle = {
  backgroundColor: "#aed581",
  color: "#264d00",
  fontWeight: "700",
  boxShadow: "inset 4px 0 0 0 #558b2f",
};

const linkHoverStyle = {
  //backgroundColor: "#9ccc65",
  color: "#9ccc65",
};

const contentStyle = {
  marginLeft: "220px",
  padding: "30px 40px",
  minHeight: "100vh",
  backgroundColor: "#f6f6f6",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  width: "calc(100% - 220px)",
  boxSizing: "border-box",
};


function AdminLayout({ children }) {
  const location = useLocation();

  return (
    <div style={{ display: "flex" }}>
      <aside style={sidebarStyle}>
        <div style={logoStyle}>Admin Panel</div>
        <nav>
          <ul style={navListStyle}>
            {[
              { label: "Dashboard", to: "/admin-dashboard"},
              { label: "Home", to: "/admin-home" },
              { label: "Tour Packages", to: "/admin-tours" },
              { label: "Gallery", to: "/admin-gallery" },
              { label: "Blog", to: "/admin-blog" },
              { label: "About", to: "/admin-about" },
              { label: "Contact", to: "/admin-contact" },
              { label: "Logout", to: "/admin-login" },
            ].map(({ label, to }) => {
              const isActive = location.pathname === to;

              return (
                <li key={to}>
                  <Link
                    to={to}
                    style={{
                      ...linkStyle,
                      ...(isActive ? activeLinkStyle : {}),
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        Object.assign(e.currentTarget.style, linkHoverStyle);
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        Object.assign(e.currentTarget.style, linkStyle);
                      }
                    }}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <main style={contentStyle}>{children}</main>
    </div>
  );
}

export default AdminLayout;
