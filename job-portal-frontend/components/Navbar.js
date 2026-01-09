import React from 'react';
import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext"; // import Auth context
import './Navbar.css'; 

const Navbar = () => {
  const { user, logout } = useAuth(); // get user and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to home after logout
  };

  return (
    <nav>
      <div className="logo">Azan Job Portal</div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        {user && <li><Link to="/profile">Profile</Link></li>}
        {user && <li><Link to="/dashboard">Dashboard</Link></li>}
        <li><Link to="/about">About</Link></li>
        <li>
          <a href="https://github.com/Azan-FullStack" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>

        {/* Conditional buttons based on login status */}
        {!user && <li><Link to="/login">Login</Link></li>}
        {!user && <li><Link to="/signup">Sign Up</Link></li>}
        {user && <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>}
      </ul>
    </nav>
  );
};

export default Navbar;


  




      

  



