import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  if (!user) {
    return (
      <div>
        <h1>Welcome to Azan Job Portal</h1>
        <button onClick={() => { setShowLogin(true); setShowSignup(false); }}>Login</button>
        <button onClick={() => { setShowSignup(true); setShowLogin(false); }}>Sign Up</button>
        {showLogin && <Login />}
        {showSignup && <Signup />}
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome {user.username}!</h1>
      <p>You are logged in. Access dashboard, profile, and jobs below.</p>
    </div>
  );
};

export default Home;



