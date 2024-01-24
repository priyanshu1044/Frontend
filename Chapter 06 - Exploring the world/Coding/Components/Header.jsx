import React, { useState } from "react";
import Title from "./Title";
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';

// Header component for header section: Logo, Nav Items
const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <div className="header">
      <Title />
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
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
