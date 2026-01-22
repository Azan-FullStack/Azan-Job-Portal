import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const API = "https://azan-job-portal.onrender.com/api/auth";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // LOGIN
  const login = async (email, password) => {
    const res = await axios.post(`${API}/login`, { email, password });

    const userWithToken = {
      ...res.data.user,
      token: res.data.token,
    };

    setUser(userWithToken);
    localStorage.setItem("user", JSON.stringify(userWithToken));

    return userWithToken;
  };

  // SIGNUP
  const signup = async (username, email, password) => {
    const res = await axios.post(`${API}/signup`, {
      username,
      email,
      password,
    });

    const userWithToken = {
      ...res.data.user,
      token: res.data.token,
    };

    setUser(userWithToken);
    localStorage.setItem("user", JSON.stringify(userWithToken));

    return userWithToken;
  };

  // LOGOUT
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











