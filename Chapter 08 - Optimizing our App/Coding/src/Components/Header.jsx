import React, { useState,useEffect } from "react";
import Title from "./Title";
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import { Link } from "react-router-dom";
import useLocalStorage from "../Utils/useLocalStorage";
import useAuth from "../Utils/useAuth";
import useOnline from "../Utils/useOnlineStatus";


// Header component for header section: Logo, Nav Items
const Header = () => {

    // call custom hook useLocalStorage for getting localStorage value of user
    const [getLocalStorage, , clearLocalStorage] = useLocalStorage("user");

    // call custom hook useAuth for user is loggedin or not
    const [isLoggedin, setIsLoggedin] = useAuth();
  
    useEffect(() => {
      // if value of getLocalStorage is equal to null setIsLoggedin to false
      if (getLocalStorage === null) {
        setIsLoggedin(false);
      }
    }, [getLocalStorage])
  
    // call custom hook useOnline if user is online or not
    const isOnline = useOnline();

  const isLoggedIn=useAuth();
  return (
    <div className="header">
      <Title />
      <div className="nav-items">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about-us">AboutUs</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/instamart">InstaMart</Link></li>
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
