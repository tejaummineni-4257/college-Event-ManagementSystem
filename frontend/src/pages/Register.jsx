import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://college-event-management-system-dvr3.onrender.com/api/users/register",
        formData
      );

      alert(res.data.message || "✅ Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error("Error during registration:", err.response?.data || err);
      alert(err.response?.data?.message || "❌ Registration failed. Try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="welcome-text">📝 Create Your Account</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            name="username"
            type="text"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="login-btn">
            Register
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="register-link">
            <strong>Login</strong>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
