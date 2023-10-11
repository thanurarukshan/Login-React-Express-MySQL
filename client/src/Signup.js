import React from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="signup-app">
      <div className="signup-main">
        <span className="signup-main-title">Sign Up</span>
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Password" />
        <Link to="/">
          <button>Already have account ?</button>
        </Link>
        <button className="login">Login</button>
      </div>
    </div>
  );
}

export default Signup;
