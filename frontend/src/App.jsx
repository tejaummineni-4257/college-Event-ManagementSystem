// App.jsx (React Router v6)
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Default home page */}
        <Route path="/" element={<Home />} />

        {/* Other routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        

        {/* Fallback 404 route */}
        <Route
          path="*"
          element={
            <div style={{ padding: 20, textAlign: "center" }}>
              404 — Page not found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
