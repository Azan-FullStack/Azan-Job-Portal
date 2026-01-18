import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// HTTPS URL of your backend
const API = "https://azan-job-portal.onrender.com/api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Login
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API}/login`, { email, password });
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data.user;
    } catch (err) {
      console.error(err);
      // Show error from backend if available
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  // Signup
  const signup = async (username, email, password) => {
    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }

    try {
      const res = await axios.post(`${API}/signup`, { username, email, password });
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data.user;
    } catch (err) {
      console.error(err);
      throw new Error(err.response?.data?.message || "Signup failed");
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);











