import React, { useState } from "react";
import "../App.css";

const StudentDashboard = () => {
  const [openSection, setOpenSection] = useState(null);
  const [openClub, setOpenClub] = useState(null);
  const [openEvent, setOpenEvent] = useState(null);
  const [showClubDetails, setShowClubDetails] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(null);
  const [registerClub, setRegisterClub] = useState(null);
  const [registerEvent, setRegisterEvent] = useState(null);

  const handleSectionToggle = (section) => {
    setOpenSection(openSection === section ? null : section);
    setOpenClub(null);
    setOpenEvent(null);
    setShowClubDetails(null);
    setShowEventDetails(null);
    setRegisterClub(null);
    setRegisterEvent(null);
  };

  const clubs = [
    {
      id: 1,
      name: "Robotics Club",
      icon: "🤖",
      details: [
        "Weekly meetings every Tuesday at 4 PM in Lab 2.",
        "Upcoming Event: Robot Design Contest (Nov 22).",
      ],
    },
    {
      id: 2,
      name: "Drama Club",
      icon: "🎭",
      details: [
        "Practice sessions every Wednesday at 5 PM in Auditorium.",
        "Upcoming: Winter Stage Play rehearsals.",
      ],
    },
    {
      id: 3,
      name: "Music Club",
      icon: "🎵",
      details: [
        "Jam sessions every Friday in Music Room.",
        "Upcoming: Acoustic Night (Dec 5).",
      ],
    },
    {
      id: 4,
      name: "Sports Club",
      icon: "⚽",
      details: [
        "Practice sessions on weekends.",
        "Upcoming: Cricket, Volleyball & Chess tournaments.",
      ],
    },
  ];

  const events = [
    {
      id: 1,
      title: "TechFest 2025 🚀",
      date: "Nov 15, 2025",
      location: "Main Auditorium",
      details:
        "A grand event with coding contests, tech talks, and innovation exhibitions.",
    },
    {
      id: 2,
      title: "Cultural Night 🎭",
      date: "Dec 10, 2025",
      location: "Open Ground",
      details:
        "An evening of music, dance, and art celebrating diversity and creativity.",
    },
    {
      id: 3,
      title: "Sports Meet 2026 🏅",
      date: "Jan 8, 2026",
      location: "College Stadium",
      details:
        "Annual sports event with athletics, cricket, football, and more.",
    },
  ];

  const academicSchedule = [
    {
      id: 1,
      title: "Mid-Sem Exams",
      date: "Nov 20 - Nov 25, 2025",
      info: "Examinations will cover all core subjects. Check timetable on the notice board.",
    },
    {
      id: 2,
      title: "Project Submission",
      date: "Dec 10, 2025",
      info: "Final year students must submit project reports via the online portal.",
    },
    {
      id: 3,
      title: "Winter Break",
      date: "Dec 24, 2025 - Jan 2, 2026",
      info: "Enjoy your winter vacation! College reopens on Jan 3, 2026.",
    },
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🎓 Student Dashboard</h1>
        <p>Welcome to your student portal — stay updated!</p>
      </header>

      {/* 📰 NEWS */}
      <section
        className={`dashboard-section news ${openSection === "news" ? "open" : ""}`}
        onClick={() => handleSectionToggle("news")}
      >
        <h2 className="section-title">
          <span className="icon news-icon">📰</span> News
        </h2>
        {openSection === "news" && (
          <ul>
            <li>New semester begins on <strong>Nov 10, 2025</strong>.</li>
            <li>Library timings updated to <strong>8AM - 8PM</strong>.</li>
            <li>New AI lab inaugurated in Block B.</li>
          </ul>
        )}
      </section>

      {/* 📢 NOTICES */}
      <section
        className={`dashboard-section notices ${openSection === "notices" ? "open" : ""}`}
        onClick={() => handleSectionToggle("notices")}
      >
        <h2 className="section-title">
          <span className="icon notice-icon">📢</span> Notices
        </h2>
        {openSection === "notices" && (
          <ul>
            <li>Assignment submissions due by <strong>Nov 5</strong>.</li>
            <li>Mid-sem exams from <strong>Nov 20 - Nov 25</strong>.</li>
            <li>Sports registration closes on <strong>Nov 8</strong>.</li>
          </ul>
        )}
      </section>

      {/* 🏫 CLUBS */}
      <section
        className={`dashboard-section clubs ${openSection === "clubs" ? "open" : ""}`}
        onClick={() => handleSectionToggle("clubs")}
      >
        <h2 className="section-title">
          <span className="icon club-icon">🏫</span> Clubs
        </h2>

        {openSection === "clubs" && (
          <div className="clubs-list">
            {clubs.map((club) => (
              <div
                key={club.id}
                className={`club-item ${openClub === club.id ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenClub(club.id);
                }}
              >
                <div className="club-header">
                  <span className="club-icon-inner">{club.icon}</span> {club.name}
                </div>

                {openClub === club.id && (
                  <div className="club-actions">
                    <button
                      className="register-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowClubDetails(club.id);
                        setRegisterClub(null);
                      }}
                    >
                      Details
                    </button>
                    <button
                      className="register-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setRegisterClub(club.id);
                        setShowClubDetails(null);
                      }}
                    >
                      Register
                    </button>

                    {showClubDetails === club.id && (
                      <div className="club-details">
                        {club.details.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    )}

                    {registerClub === club.id && (
                      <form
                        className="register-form"
                        onClick={(e) => e.stopPropagation()}
                        onSubmit={(e) => {
                          e.preventDefault();
                          alert(`✅ Registration successful for ${club.name}!`);
                        }}
                      >
                        <input type="text" placeholder="Full Name" required />
                        <input type="text" placeholder="Reg Number" required />
                        <input type="email" placeholder="Email Address" required />
                        <input type="text" placeholder="Section" required />
                        <select required>
                          <option value="">Select Year</option>
                          <option>1st Year</option>
                          <option>2nd Year</option>
                          <option>3rd Year</option>
                          <option>4th Year</option>
                        </select>
                        <button type="submit" className="register-submit-btn">
                          Submit
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 📅 ACADEMIC CALENDAR */}
      <section
        className={`dashboard-section calendar ${openSection === "calendar" ? "open" : ""}`}
        onClick={() => handleSectionToggle("calendar")}
      >
        <h2 className="section-title">
          <span className="icon calendar-icon">📅</span> Academic Calendar
        </h2>

        {openSection === "calendar" && (
          <div className="calendar-list">
            {academicSchedule.map((item) => (
              <div key={item.id} className="calendar-item">
                <h4>📘 {item.title}</h4>
                <p><strong>🗓 Date:</strong> {item.date}</p>
                <p>{item.info}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 🎉 EVENTS */}
      <section
        className={`dashboard-section events ${openSection === "events" ? "open" : ""}`}
        onClick={() => handleSectionToggle("events")}
      >
        <h2 className="section-title">
          <span className="icon event-icon">🎉</span> Upcoming Events
        </h2>

        {openSection === "events" && (
          <div className="events-list">
            {events.map((event) => (
              <div
                key={event.id}
                className={`event-item ${openEvent === event.id ? "active" : ""}`}
              >
                <div
                  className="event-header"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenEvent(event.id);
                  }}
                >
                  <span className="event-icon-inner">🎊</span> {event.title} — {event.date}
                </div>

                {openEvent === event.id && (
                  <div className="event-actions">
                    <button
                      className="register-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowEventDetails(event.id);
                        setRegisterEvent(null);
                      }}
                    >
                      Details
                    </button>
                    <button
                      className="register-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setRegisterEvent(event.id);
                        setShowEventDetails(null);
                      }}
                    >
                      Register
                    </button>

                    {showEventDetails === event.id && (
                      <div className="event-details">
                        <p><strong>📍 Location:</strong> {event.location}</p>
                        <p>{event.details}</p>
                      </div>
                    )}

                    {registerEvent === event.id && (
                      <form
                        className="register-form"
                        onClick={(e) => e.stopPropagation()}
                        onSubmit={(e) => {
                          e.preventDefault();
                          alert(`✅ Registered successfully for ${event.title}!`);
                        }}
                      >
                        <input type="text" placeholder="Full Name" required />
                        <input type="text" placeholder="Reg Number" required />
                        <input type="email" placeholder="Email Address" required />
                        <input type="text" placeholder="Section" required />
                        <select required>
                          <option value="">Select Year</option>
                          <option>1st Year</option>
                          <option>2nd Year</option>
                          <option>3rd Year</option>
                          <option>4th Year</option>
                        </select>
                        <button type="submit" className="register-submit-btn">
                          Submit
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default StudentDashboard;
