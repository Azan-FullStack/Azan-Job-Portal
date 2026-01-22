import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await login(email, password);
    alert("Login successful!");
  } catch (err) {
    // Check if backend sent a response
    if (err.response) {
      // Backend responded with a status code (like 401 or 400)
      alert(err.response.data.message || "Login failed");
    } else if (err.request) {
      // Request was made but no response received
      alert("Network error: Could not reach server");
    } else {
      // Something else happened
      alert("Error: " + err.message);
    }
    console.error(err); // Always log to console for debugging
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;


