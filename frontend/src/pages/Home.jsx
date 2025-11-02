import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Home = () => {
  return (
    <div className="home-page">
      <nav className="navbar">
        <h1>🎓 College Event</h1>
        <div className="nav-links">
          <Link to="/login" className="nav-btn">Login</Link>
          <Link to="/register" className="nav-btn">Register</Link>
        </div>
      </nav>

      <div className="home-content">
        <h2>Welcome to the College Event Management System</h2>
        <p>
          Manage all your college events efficiently.<br />
          Register or login to get started!
        </p>
      </div>
    </div>
  );
};

export default Home;
