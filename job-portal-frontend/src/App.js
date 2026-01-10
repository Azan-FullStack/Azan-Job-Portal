import React from "react";
import { Routes, Route } from "react-router-dom";

import "./components/App.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

import { JobProvider } from "./context/JobContext";
import { AuthProvider } from "./context/AuthContext";
import { ApplicationProvider} from "./context/ApplicationContext";

function App() {
  return (
     <div className="app-background">
    <AuthProvider>
      <JobProvider>
        <ApplicationProvider>

        <Navbar />

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        </ApplicationProvider>
      </JobProvider>
    </AuthProvider>
    </div>
  );
}

export default App;


