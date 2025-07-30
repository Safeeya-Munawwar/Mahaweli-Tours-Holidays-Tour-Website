import React from "react";

const AdminDashboard = () => {
  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
     
      <div style={{ display: "flex", justifyContent: "center", margin: "30px 0" }}>
  <img
    src="/images/logo.PNG"
    alt="Mahaweli Logo"
    style={{ height: 120, width: "auto" }}
  />
</div>

<h1
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: "3.6rem",
          color: "#064420",
          textAlign: "center",
          marginBottom: 12,
          userSelect: "none",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        Mahaweli Tours & Holidays
      </h1>

      <h3
        style={{
          textAlign: "center",
          marginBottom: 40,
          fontSize: "2.6rem",
          fontWeight: "700",
          letterSpacing: "0.04em",
          color: "#2c5d30",
        }}
      >
        Admin Dashboard
      </h3>
      </header>

      <main style={mainStyle}>
        <p style={welcomeStyle}>Welcome to the Admin Dashboard, your centralized control panel to efficiently manage all aspects of the website. From creating and updating tour packages to overseeing bookings and monitoring user interactions, this dashboard provides all the tools you need to keep the site running smoothly and deliver an excellent experience to your visitors. Stay organized, update content quickly, and maintain full control of your operations in one convenient place.</p>
      </main>
    </div>
  );
};

const containerStyle = {
  maxWidth: 1200,
  margin: "auto",
  padding: 30,
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: "#064420",
  minHeight: "100vh",
  backgroundColor: "#f0f8e9",
};

const headerStyle = {
  borderBottom: "2px solid #064420",
  paddingBottom: 15,
  marginBottom: 30,
};

const mainStyle = {
  textAlign: "center",
};

const welcomeStyle = {
  fontSize: "1.3rem",
  color: "#2c5d30",
};

export default AdminDashboard;
