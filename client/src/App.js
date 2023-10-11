import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className='app-main'>
        <span className="signin-main-title">Sign In</span>
        <input type="text" placeholder='email'/>
        <input type="text" placeholder='Password'/>
        <Link to="/signup"><button className='createaccount'>Create Account</button></Link>
        <button className='login'>Login</button>
      </div>
    </div>
  );
}

export default App;
