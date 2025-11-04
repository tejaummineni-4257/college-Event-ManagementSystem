import axios from "axios";

const API_URL = "http://localhost:5000/api";

// ✅ Users
export const registerUser = (userData) =>
  axios.post(`${API_URL}/users/register`, userData);

export const loginUser = (userData) =>
  axios.post(`${API_URL}/users/login`, userData);

// ✅ Content endpoints (for students/admin)
export const fetchEvents = () => axios.get(`${API_URL}/events`);
export const fetchNews = () => axios.get(`${API_URL}/news`);
export const fetchNotices = () => axios.get(`${API_URL}/notices`);
export const fetchClubs = () => axios.get(`${API_URL}/clubs`);

// ✅ Admin actions
export const addEvent = (event) => axios.post(`${API_URL}/events`, event);
export const addNews = (news) => axios.post(`${API_URL}/news`, news);
export const addNotice = (notice) => axios.post(`${API_URL}/notices`, notice);
export const addClub = (club) => axios.post(`${API_URL}/clubs`, club);

export const deleteEvent = (id) => axios.delete(`${API_URL}/events/${id}`);
export const deleteNews = (id) => axios.delete(`${API_URL}/news/${id}`);
export const deleteNotice = (id) => axios.delete(`${API_URL}/notices/${id}`);
export const deleteClub = (id) => axios.delete(`${API_URL}/clubs/${id}`);
