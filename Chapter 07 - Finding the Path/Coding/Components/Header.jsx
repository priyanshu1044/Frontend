import React, { useState } from "react";
import Title from "./Title";
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import { Link } from "react-router-dom";

// Header component for header section: Logo, Nav Items
const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <div className="header">
      <Title />
      <div className="nav-items">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about-us">AboutUs</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li>{isLoggedIn ? 
            <button className="logout-btn" onClick={()=>{setIsLoggedIn(false)}}>
              <div className="btn-content">
                Logout 
                <LoginTwoToneIcon fontSize="small" />
              </div>
            </button> : 
            <button className="login-btn" onClick={()=>{setIsLoggedIn(true)}}>
              <div className="btn-content">
                Login 
                <LogoutTwoToneIcon fontSize="small" />
              </div>
            </button>
          }</li>
        </ul>
      </div>
    </div>
  );
};
 
export default Header;
