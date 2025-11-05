import React from "react";
import { Link } from "react-router-dom";
import { FaGraduationCap, FaCalendarAlt, FaUsers, FaBullhorn, FaArrowRight, FaUserCircle, FaUserPlus } from "react-icons/fa";
import "../App.css";

const Home = () => {
  return (
    <div className="home-page">
      <nav className="navbar">
        <h1 className="logo">
          <FaGraduationCap className="logo-icon" /> 
          College Event Portal
        </h1>
        <div className="nav-links">
          <Link to="/login" className="nav-btn">
            <FaUserCircle /> Login
          </Link>
          <Link to="/register" className="nav-btn">
            <FaUserPlus /> Register
          </Link>
        </div>
      </nav>

      <div className="home-content">
        <div className="hero-section">
          <FaGraduationCap className="hero-icon" />
          <h1 className="hero-title">University Event Management Portal</h1>
          <p className="hero-subtitle">
            Your gateway to campus events, clubs, and activities
          </p>
          <div className="cta-buttons">
            <Link to="/login" className="cta-btn primary">
              Get Started <FaArrowRight />
            </Link>
            <Link to="/register" className="cta-btn secondary">
              Create Account
            </Link>
          </div>
        </div>

        <div className="features">
          <div className="feature-card">
            <FaCalendarAlt className="feature-icon" />
            <h3>Event Calendar</h3>
            <p>Stay updated with upcoming campus events</p>
          </div>
          <div className="feature-card">
            <FaUsers className="feature-icon" />
            <h3>Club Activities</h3>
            <p>Join and manage your favorite clubs</p>
          </div>
          <div className="feature-card">
            <FaBullhorn className="feature-icon" />
            <h3>Announcements</h3>
            <p>Never miss important campus notices</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
