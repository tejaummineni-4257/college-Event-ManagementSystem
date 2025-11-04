import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEvents, fetchNews, fetchNotices, fetchClubs } from "../api/api";
import "../StudentDashboard.css";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("events");
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [eventToRegister, setEventToRegister] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    regno: "",
    department: "",
    year: "",
    section: "",
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Load data dynamically based on tab
  useEffect(() => {
    const loadData = async () => {
      try {
        let res;
        switch (activeTab) {
          case "events":
            res = await fetchEvents();
            break;
          case "news":
            res = await fetchNews();
            break;
          case "notices":
            res = await fetchNotices();
            break;
          case "clubs":
            res = await fetchClubs();
            break;
          default:
            return;
        }
        setData(res.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    loadData();
  }, [activeTab]);

  // ✅ Show details modal
  const handleDetails = (item) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  // ✅ Open register modal (only for events/clubs)
  const handleOpenRegister = (item) => {
    if (activeTab === "news" || activeTab === "notices") return;
    setEventToRegister(item);
    setShowRegisterModal(true);
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Register (mock only)
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    alert(`✅ You have successfully registered for "${eventToRegister?.title}"`);
    setShowRegisterModal(false);
    setForm({
      fullName: "",
      email: "",
      regno: "",
      department: "",
      year: "",
      section: "",
    });
  };

  // ✅ Logout
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      alert("You have successfully logged out!");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <div className="student-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>🎓 Student Dashboard</h2>
        <ul>
          {["events", "news", "notices", "clubs"].map((tab) => (
            <li
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </li>
          ))}
        </ul>

        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="content">
        <h2>{activeTab.toUpperCase()}</h2>

        {data.length === 0 ? (
          <p>No {activeTab} available.</p>
        ) : (
          <div className="card-container">
            {data.map((item) => (
              <div key={item._id} className="card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>

                {activeTab === "events" && (
                  <p>
                    📅 {item.date || "N/A"} | ⏰ {item.time || "N/A"} | 📍{" "}
                    {item.location || "TBD"}
                  </p>
                )}

                {activeTab === "clubs" && (
                  <>
                    {item.details && <p>{item.details}</p>}
                    {item.nextMeet && <p>🎯 Next Meet: {item.nextMeet}</p>}
                  </>
                )}

                <div className="card-actions">
                  <button onClick={() => handleDetails(item)}>ℹ️ Details</button>

                  {/* ✅ Show Register button only for Events & Clubs */}
                  {(activeTab === "events" || activeTab === "clubs") && (
                    <button onClick={() => handleOpenRegister(item)}>
                      📝 Register
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DETAILS MODAL */}
      {showDetailsModal && selectedItem && (
        <div
          className="modal-overlay"
          onClick={() => setShowDetailsModal(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedItem.title}</h2>
            <p>{selectedItem.description}</p>
            {selectedItem.date && <p>📅 Date: {selectedItem.date}</p>}
            {selectedItem.time && <p>⏰ Time: {selectedItem.time}</p>}
            {selectedItem.location && (
              <p>📍 Location: {selectedItem.location}</p>
            )}
            {selectedItem.details && <p>📝 {selectedItem.details}</p>}

            <div className="modal-buttons">
              {/* ✅ Only show Register button for Events & Clubs */}
              {(activeTab === "events" || activeTab === "clubs") && (
                <button onClick={() => handleOpenRegister(selectedItem)}>
                  📝 Register Now
                </button>
              )}
              <button onClick={() => setShowDetailsModal(false)}>❌ Close</button>
            </div>
          </div>
        </div>
      )}

      {/* REGISTER MODAL */}
      {showRegisterModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowRegisterModal(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>
              Register for{" "}
              {activeTab === "events" ? "🎉 " : "🎯 "}
              {eventToRegister?.title}
            </h2>
            <form onSubmit={handleRegisterSubmit}>
              <div>
                <label>Full Name:</label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Register No:</label>
                <input
                  type="text"
                  name="regno"
                  value={form.regno}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Department / Branch:</label>
                <input
                  type="text"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Year:</label>
                <input
                  type="text"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Section:</label>
                <input
                  type="text"
                  name="section"
                  value={form.section}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="modal-buttons">
                <button type="submit">📝 Register</button>
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
