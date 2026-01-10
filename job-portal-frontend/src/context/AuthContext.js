import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// Use HTTPS URL of your backend
const API = process.env.REACT_APP_API_URL || "https://azan-job-portal.onrender.com/api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Login
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${API}/login`,
        { email, password },
        { withCredentials: true } // IMPORTANT for cookies
      );
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // Signup
  const signup = async (username, email, password) => {
    if (!username || !email || !password)
      return alert("All fields are required");
    try {
      const res = await axios.post(
        `${API}/signup`,
        { username, email, password },
        { withCredentials: true } // IMPORTANT for cookies
      );
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Signup successful!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
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










