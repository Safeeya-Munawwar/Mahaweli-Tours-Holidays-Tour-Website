import React from "react";
import {
  FaYoutubeSquare,
  FaTripadvisor,
  FaPinterestSquare,
  FaInstagramSquare,
  FaGooglePlusSquare,
  FaFacebookSquare,
} from "react-icons/fa";

const socialMediaMap = {
  Facebook: {
    url: "https://www.facebook.com/MahaweliTours/?_rdc=1&_rdr#",
    icon: <FaFacebookSquare color="#4267B2" size={30} />,
  },
  Youtube: {
    url: "https://www.youtube.com/channel/UCSp2pb786590VYoudmVIvaQ",
    icon: <FaYoutubeSquare color="#FF0000" size={30} />,
  },
  Tripadvisor: {
    url: "https://www.tripadvisor.com/Attraction_Review-g12901287-d6453937-Reviews-Mahaweli_Tours_Holidays-Kandana_Western_Province.html",
    icon: <FaTripadvisor color="#34E0A1" size={30} />,
  },
  Pinterest: {
    url: "https://www.pinterest.com/travelwithmahaweli/",
    icon: <FaPinterestSquare color="#E60023" size={30} />,
  },
  Instagram: {
    url: "https://www.instagram.com/mahaweli.lk/",
    icon: <FaInstagramSquare color="#C13584" size={30} />,
  },
  Google: {
    url: "https://www.google.lk/search?q=mahaweli+tours+and+holidays+google+my+business+page",
    icon: <FaGooglePlusSquare color="#DB4437" size={30} />,
  },
};

const Footer = () => {
  return (
    <footer
      style={{
        padding: "40px 20px",
        textAlign: "center",
        backgroundColor: "#f4f9f9",
        color: "#064420",
        boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.08)",
        marginTop: "3rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div style={{ marginBottom: 30 }}>
        <p style={{ margin: "8px 0", fontSize: 16 }}>
          <strong>Call us:</strong>{" "}
          <a
            href="tel:+94777111553"
            style={{ color: "#064420", textDecoration: "none", fontWeight: 500 }}
          >
            +94 777 111553
          </a>
        </p>
        <p style={{ margin: "8px 0", fontSize: 16 }}>
          <strong>Write to us:</strong>{" "}
          <a
            href="mailto:info@mahaweli.lk"
            style={{ color: "#064420", textDecoration: "none", fontWeight: 500 }}
          >
            info@mahaweli.lk
          </a>
        </p>
        <p style={{ margin: "8px 0", fontSize: 16 }}>
          <strong>Address:</strong> No 15/7, Bernadett Mawatha, Kandana, Sri Lanka
        </p>
      </div>

      <div>
        <p style={{ fontWeight: "bold", marginBottom: 10, fontSize: 16 }}>
          Follow us
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 18,
            marginTop: 5,
          }}
        >
          {Object.entries(socialMediaMap).map(([platform, { url, icon }]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              title={platform}
              style={{
                transition: "transform 0.3s, opacity 0.3s",
                opacity: 0.9,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.2)";
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.opacity = "0.9";
              }}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      <p
        style={{
          marginTop: 35,
          fontSize: 13,
          userSelect: "none",
          color: "#666",
        }}
      >
        ©2025 Mahaweli Tours. All rights reserved | Developed By: Safeeya Munawwar
      </p>
    </footer>
  );
};

export default Footer;
