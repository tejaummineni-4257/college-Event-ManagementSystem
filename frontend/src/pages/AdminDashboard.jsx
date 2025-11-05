import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaCalendarAlt,
  FaNewspaper,
  FaBullhorn,
  FaUsers,
  FaPlus,
  FaTrash,
  FaSignOutAlt,
  FaEdit,
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("events");
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const API_BASE = "http://localhost:5000/api";

  // Fetch data on tab change
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/${activeTab}`);
      setData(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
      setData([]);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      alert("Logged out successfully!");
      navigate("/login");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_BASE}/${activeTab}/${editId}`, formData);
        alert(`${activeTab.slice(0, -1)} updated successfully!`);
      } else {
        await axios.post(`${API_BASE}/${activeTab}`, formData);
        alert(`${activeTab.slice(0, -1)} added successfully!`);
      }
      setFormData({});
      setEditId(null);
      fetchData();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong!");
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await axios.delete(`${API_BASE}/${activeTab}/${id}`);
        fetchData();
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  // Edit item
  const handleEdit = (item) => {
    // Exclude _id and timestamps from formData
    const { _id, createdAt, updatedAt, __v, ...editableData } = item;
    setFormData(editableData);
    setEditId(item._id);
    // Scroll to top so user can see the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update registration status
  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`${API_BASE}/registrations/${id}`, { status });
      alert(`Registration ${status} successfully!`);
      fetchData();
    } catch (error) {
      console.error("Status update error:", error);
      alert("Failed to update status");
    }
  };

  const icons = {
    events: <FaCalendarAlt color="#ff7043" />,
    news: <FaNewspaper color="#42a5f5" />,
    notices: <FaBullhorn color="#ef5350" />,
    clubs: <FaUsers color="#66bb6a" />,
    registrations: <FaClipboardList color="#ab47bc" />,
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>⚙️ Admin Panel</h2>
        <ul>
          {["events", "news", "notices", "clubs", "registrations"].map((tab) => (
            <li
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => {
                setActiveTab(tab);
                setFormData({});
                setEditId(null);
              }}
            >
              {icons[tab]} {tab.toUpperCase()}
            </li>
          ))}
        </ul>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt color="#fff" /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="content">
        <h2>
          {icons[activeTab]}  {activeTab.toUpperCase()}
        </h2>

        {/* Show form only for non-registration tabs */}
        {activeTab !== "registrations" && (
        <form className="add-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title || ""}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description || ""}
            onChange={handleChange}
            required
          />

          {activeTab === "events" && (
            <>
              <input
                type="date"
                name="date"
                value={formData.date || ""}
                onChange={handleChange}
              />
              <input
                type="time"
                name="time"
                value={formData.time || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location || ""}
                onChange={handleChange}
              />
            </>
          )}
          {activeTab === "clubs" && (
            <>
              <input
                type="date"
                name="date"
                value={formData.date || ""}
                onChange={handleChange}
              />
              <input
                type="time"
                name="time"
                value={formData.time || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location || ""}
                onChange={handleChange}
              />
            </>
          )}

          <button type="submit" className="add-btn">
            <FaPlus /> {editId ? "Update" : "Add"} {activeTab.slice(0, -1)}
          </button>
        </form>
        )}

        {/* Data List */}
        {activeTab === "registrations" ? (
          /* Registration List View */
          <div className="registration-list">
            {data.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Email</th>
                    <th>Reg No</th>
                    <th>Dept/Year</th>
                    <th>Type</th>
                    <th>Event/Club</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((reg) => (
                    <tr key={reg._id}>
                      <td>{reg.fullName}</td>
                      <td>{reg.email}</td>
                      <td>{reg.regno}</td>
                      <td>{reg.department} / {reg.year}-{reg.section}</td>
                      <td>
                        <span className={`type-badge ${reg.type || 'event'}`}>
                          {reg.type ? reg.type.toUpperCase() : "N/A"}
                        </span>
                      </td>
                      <td>{reg.itemTitle}</td>
                      <td>
                        <span className={`status-badge ${reg.status || 'pending'}`}>
                          {reg.status ? reg.status.toUpperCase() : "PENDING"}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          {reg.status !== "approved" && (
                            <button
                              className="btn-approve"
                              onClick={() => handleStatusUpdate(reg._id, "approved")}
                            >
                              <FaCheckCircle /> Approve
                            </button>
                          )}
                          {reg.status !== "rejected" && (
                            <button
                              className="btn-reject"
                              onClick={() => handleStatusUpdate(reg._id, "rejected")}
                            >
                              <FaTimesCircle /> Reject
                            </button>
                          )}
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(reg._id)}
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No registrations available.</p>
            )}
          </div>
        ) : (
          /* Regular Item List for other tabs */
          <ul className="item-list">
            {data.length > 0 ? (
              data.map((item) => (
                <li key={item._id} className="item-card">
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                    {activeTab === "events" && (
                      <p>
                        <b>Date:</b> {item.date || "N/A"} | <b>Time:</b>{" "}
                        {item.time || "N/A"} | <b>Location:</b>{" "}
                        {item.location || "N/A"}
                      </p>
                    )}
                  </div>

                  <div className="item-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No {activeTab} available.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
