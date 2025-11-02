import React, { useState } from "react";
import "../App.css";

const AdminDashboard = () => {
  const [openSection, setOpenSection] = useState(null);

  const [newsList, setNewsList] = useState([
    "Semester begins on Nov 10, 2025",
    "New AI Lab inaugurated",
  ]);
  const [noticesList, setNoticesList] = useState([
    "Mid-sem Exams from Nov 20 - Nov 25",
    "Sports registration closes Nov 8",
  ]);
  const [eventsList, setEventsList] = useState([
    {
      title: "TechFest 2025 🚀",
      date: "Nov 15, 2025",
      location: "Main Auditorium",
      details:
        "A grand event with coding contests, tech talks, and innovation exhibitions.",
    },
  ]);

  const [clubsList, setClubsList] = useState([
    {
      name: "Robotics Club",
      meeting: "Weekly meetings on Tuesdays at 4 PM",
      upcoming: "Robot Design Contest (Nov 22)",
    },
    {
      name: "Drama Club",
      meeting: "Practice every Wednesday at 5 PM",
      upcoming: "Winter Stage Play",
    },
  ]);

  const [newItem, setNewItem] = useState("");
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    location: "",
    details: "",
  });
  const [newClub, setNewClub] = useState({
    name: "",
    meeting: "",
    upcoming: "",
  });

  const handleSectionToggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // ------------------ NEWS --------------------
  const handleAddNews = () => {
    if (newItem.trim() !== "") {
      setNewsList([...newsList, newItem]);
      setNewItem("");
    }
  };

  const handleDeleteNews = (index) => {
    setNewsList(newsList.filter((_, i) => i !== index));
  };

  // ------------------ NOTICES --------------------
  const handleAddNotice = () => {
    if (newItem.trim() !== "") {
      setNoticesList([...noticesList, newItem]);
      setNewItem("");
    }
  };

  const handleDeleteNotice = (index) => {
    setNoticesList(noticesList.filter((_, i) => i !== index));
  };

  // ------------------ EVENTS --------------------
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.location) {
      setEventsList([...eventsList, newEvent]);
      setNewEvent({ title: "", date: "", location: "", details: "" });
    }
  };

  const handleDeleteEvent = (index) => {
    setEventsList(eventsList.filter((_, i) => i !== index));
  };

  // ------------------ CLUBS --------------------
  const handleAddClub = () => {
    if (newClub.name && newClub.meeting && newClub.upcoming) {
      setClubsList([...clubsList, newClub]);
      setNewClub({ name: "", meeting: "", upcoming: "" });
    }
  };

  const handleDeleteClub = (index) => {
    setClubsList(clubsList.filter((_, i) => i !== index));
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header admin-header">
        <h1>🧑‍💼 Admin Dashboard</h1>
        <p>Manage News, Notices, Events, and Clubs efficiently!</p>
      </header>

      {/* 📰 Manage News */}
      <section
        className={`dashboard-section ${openSection === "news" ? "open" : ""}`}
        onClick={() => handleSectionToggle("news")}
      >
        <h2 className="section-title">
          <span className="icon">📰</span> Manage News
        </h2>

        {openSection === "news" && (
          <div
            className="section-content"
            onClick={(e) => e.stopPropagation()} // 🧠 prevent closing while typing
          >
            <ul>
              {newsList.map((news, i) => (
                <li key={i}>
                  {news}{" "}
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNews(i);
                    }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Add new news..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <button
              className="add-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleAddNews();
              }}
            >
              ➕ Add News
            </button>
          </div>
        )}
      </section>

      {/* 📢 Manage Notices */}
      <section
        className={`dashboard-section ${openSection === "notices" ? "open" : ""}`}
        onClick={() => handleSectionToggle("notices")}
      >
        <h2 className="section-title">
          <span className="icon">📢</span> Manage Notices
        </h2>

        {openSection === "notices" && (
          <div
            className="section-content"
            onClick={(e) => e.stopPropagation()} // 🧠 prevent closing
          >
            <ul>
              {noticesList.map((notice, i) => (
                <li key={i}>
                  {notice}{" "}
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNotice(i);
                    }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Add new notice..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <button
              className="add-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleAddNotice();
              }}
            >
              ➕ Add Notice
            </button>
          </div>
        )}
      </section>

      {/* 🎉 Manage Events */}
      <section
        className={`dashboard-section ${openSection === "events" ? "open" : ""}`}
        onClick={() => handleSectionToggle("events")}
      >
        <h2 className="section-title">
          <span className="icon">🎉</span> Manage Events
        </h2>

        {openSection === "events" && (
          <div
            className="section-content"
            onClick={(e) => e.stopPropagation()} // ✅ stops collapsing while typing
          >
            {eventsList.map((event, i) => (
              <div key={i} className="event-card">
                <h3>
                  {event.title} — {event.date}
                </h3>
                <p><strong>📍 {event.location}</strong></p>
                <p>{event.details}</p>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteEvent(i);
                  }}
                >
                  ❌ Delete
                </button>
              </div>
            ))}

            <div className="add-event-form">
              <input
                type="text"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Event Date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Event Location"
                value={newEvent.location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
              />
              <textarea
                placeholder="Event Details"
                value={newEvent.details}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, details: e.target.value })
                }
              ></textarea>
              <button
                className="add-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddEvent();
                }}
              >
                ➕ Add Event
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 🏫 Manage Clubs */}
      <section
        className={`dashboard-section ${openSection === "clubs" ? "open" : ""}`}
        onClick={() => handleSectionToggle("clubs")}
      >
        <h2 className="section-title">
          <span className="icon">🏫</span> Manage Clubs
        </h2>

        {openSection === "clubs" && (
          <div
            className="section-content"
            onClick={(e) => e.stopPropagation()} // ✅ stops collapsing while typing
          >
            {clubsList.map((club, i) => (
              <div key={i} className="club-card">
                <h3>{club.name}</h3>
                <p><strong>📅 Meeting:</strong> {club.meeting}</p>
                <p><strong>🎯 Upcoming:</strong> {club.upcoming}</p>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClub(i);
                  }}
                >
                  ❌ Delete
                </button>
              </div>
            ))}

            <div className="add-club-form">
              <input
                type="text"
                placeholder="Club Name"
                value={newClub.name}
                onChange={(e) =>
                  setNewClub({ ...newClub, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Meeting Info"
                value={newClub.meeting}
                onChange={(e) =>
                  setNewClub({ ...newClub, meeting: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Upcoming Event"
                value={newClub.upcoming}
                onChange={(e) =>
                  setNewClub({ ...newClub, upcoming: e.target.value })
                }
              />
              <button
                className="add-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddClub();
                }}
              >
                ➕ Add Club
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
