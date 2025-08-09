// src/App.js
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import './i18n';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Tours from "./pages/Tours";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";

// Admin pages
import AdminLayout from "./components/AdminLayout";
import AdminHome from "./pages/AdminHome";
import AdminTours from "./pages/AdminTours";
import AdminGallery from "./pages/AdminGallery";
import AdminBlog from "./pages/AdminBlog";
import AdminAbout from "./pages/AdminAbout";
import AdminContact from "./pages/AdminContact";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin") && location.pathname !== "/admin-login";

  return (
    <>
      {!isAdminRoute && <Navbar />}

      {isAdminRoute ? (


        <AdminLayout>
          <Routes>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-home" element={<AdminHome />} />
            <Route path="/admin-tours" element={<AdminTours />} />
            <Route path="/admin-gallery" element={<AdminGallery />} />
            <Route path="/admin-blog" element={<AdminBlog />} />
            <Route path="/admin-about" element={<AdminAbout />} />
            <Route path="/admin-contact" element={<AdminContact />} />
          </Routes>
        </AdminLayout>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:postId" element={<BlogDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
                 
      )}

      {!isAdminRoute && <Footer />}
      <FloatingWhatsApp />
    </>
  );
}

export default App;
