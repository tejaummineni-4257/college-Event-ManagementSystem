import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../Auth.css"; // styling file

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const navigate = useNavigate();

  // handle input changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://college-event-management-system-dvr3.onrender.com/api/users/login",
        formData
      );

      const user = res.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      alert("✅ Login successful!");

      if (user.role === "admin") navigate("/admin-dashboard");
      else navigate("/student-dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      alert(err.response?.data?.message || "❌ Login failed. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="welcome-text">🎓 Welcome Back!</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="auth-footer">
          Don’t have an account?{" "}
          <Link to="/register" className="register-link">
            <strong>Register!</strong>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
