# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A full-stack College Event Management System built with React (frontend) and Node.js/Express (backend), using MongoDB for data storage. The system supports two user roles: **Admin** (can CRUD events, news, notices, clubs) and **Student** (can view and register for events/clubs).

## Development Commands

### Root Directory
```bash
# Install dependencies for both frontend and backend
npm install
cd frontend && npm install
cd ../backend && npm install

# Run both frontend and backend concurrently
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client
```

### Backend (`backend/`)
```bash
# Start backend server (production mode)
npm start

# Start backend with nodemon (development mode)
npm run dev

# Seed sample data into database
npm run seed
```

### Frontend (`frontend/`)
```bash
# Start React development server (port 3000)
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Architecture

### Backend Structure (Express + MongoDB)

**Module System**: Uses ES6 modules (`import`/`export`), except `userRoutes.js` which uses CommonJS (`require`/`module.exports`).

**Authentication Flow**:
- JWT-based authentication is partially implemented but not actively used in routes
- Middleware exists in `middlewares/authMiddleware.js` with `protect` and `isAdmin` functions
- Current routes (except user login/register) do NOT enforce authentication
- User login returns user object but no JWT token

**Route Architecture**:
```
/api/users    → userRoutes.js (register, login)
/api/events   → eventRoutes.js → eventController.js
/api/clubs    → clubRoutes.js → clubController.js
/api/news     → newsRoutes.js → newsController.js
/api/notices  → noticeRoutes.js → noticeController.js
```

**Models**:
- `User`: username, fullName, email, phone, password (hashed), role ('admin'/'student')
- `Event`: title, description, date, location
- `Club`: title, description, date
- `News`: title, description, date
- `NoticeModel`: Similar structure (not reviewed in detail)

**Key Files**:
- `server.js`: Main entry point, connects MongoDB, registers routes
- `config/db.js`: MongoDB connection helper (not used by server.js, which connects directly)
- `sample/sampleData.js`: Script to seed sample events

### Frontend Structure (React)

**Routing** (React Router v6):
```
/                    → Home.jsx
/login               → Login.jsx
/register            → Register.jsx
/student-dashboard   → StudentDashboard.jsx
/admin-dashboard     → AdminDashboard.jsx
```

**Key Components**:
- `context/AuthContext.jsx`: Manages user state and localStorage (login/logout)
- `api/api.js`: Centralized axios API calls to backend (http://localhost:5000/api)
- `components/`: Navbar.jsx, Footer.jsx (reusable UI components)

**Dashboard Behavior**:
- **AdminDashboard**: Tabbed interface (events/news/notices/clubs) with CRUD operations
- **StudentDashboard**: Tabbed interface to view data + register for events/clubs (mock registration, no backend endpoint)

**Authentication**:
- User data stored in localStorage after login
- No JWT tokens used in API requests
- No protected routes or route guards implemented

## Important Notes

### Backend Inconsistencies
1. **Mixed module systems**: Most backend files use ES6 imports, but `userRoutes.js` uses CommonJS. When editing user routes, maintain CommonJS syntax.
2. **Two user controllers**: `userRoutes.js` has inline route handlers, while `userController.js` exists but is unused. Prefer editing `userRoutes.js` for user auth logic.
3. **User model has two versions**: `User.js` uses CommonJS; some controllers expect ES6 exports.
4. **No authentication on most routes**: Admin actions like create/delete are NOT protected. Authentication middleware exists but isn't applied.

### Frontend Inconsistencies
1. **AuthContext defined but not used**: The context provider is created but not wrapping the app in `index.js` or `App.jsx`.
2. **No route protection**: Admin/Student dashboards are accessible without login validation.
3. **Mock registration**: Student registration for events/clubs only shows an alert; no API call is made.

### Environment Variables
Backend requires `.env` file with:
```
MONGO_URI=<mongodb connection string>
PORT=5000
JWT_SECRET=<secret key>
```

## Testing Approach

No test files exist in the codebase. React test scripts are available via `react-scripts test` but no tests are written.

## Common Development Patterns

1. **Adding new features**: Follow the MVC pattern:
   - Create model in `backend/models/`
   - Create controller in `backend/controllers/`
   - Create routes in `backend/routes/`
   - Register routes in `server.js`
   - Add API call in `frontend/src/api/api.js`
   - Create/update UI components

2. **Database changes**: Mongoose schemas are defined in `models/`. After modifying schemas, restart the backend server.

3. **API endpoint pattern**: All backend routes are prefixed with `/api/` (e.g., `/api/events`).

4. **Styling**: CSS files are imported directly in component files (e.g., `AdminDashboard.css`, `StudentDashboard.css`).
