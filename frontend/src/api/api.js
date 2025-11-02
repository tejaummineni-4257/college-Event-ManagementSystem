import axios from 'axios';
const API_URL = 'https://college-event-management-system-dvr3.onrender.com/api';


export const registerUser = (userData) => axios.post(`${API_URL}/users/register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}/users/login`, userData);
export const fetchEvents = () => axios.get(`${API_URL}/events`);
export const addEvent = (e) => axios.post(`${API_URL}/events`, e);
export const deleteEvent = (id) => axios.delete(`${API_URL}/events/${id}`);
