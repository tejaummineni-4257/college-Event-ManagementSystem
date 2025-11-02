import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/api";
import "../App.css";

const Register = () => {
  const navigate = useNavigate();

  // ✅ include role in state
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "student", // default role
  });

  // ✅ update state when input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await registerUser(formData);

      if (res && res.status === 201) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        alert(res?.data?.message || "Registration Failed!");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      alert("Registration Failed! Check console for details.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Register</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {/* ✅ Role selection dropdown */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="role-select"
          >
            <option value="student">🎓 Student</option>
            <option value="admin">🧑‍💼 Admin</option>
          </select>

          <button type="submit">Register</button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#3498db" }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
