import React, { useState,useEffect } from "react";
import Title from "./Title";
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
    <div className="flex justify-between m-2.5 text-custom-light-beige bg-custom-darkest-blue rounded shadow-custom font-bold">
      <Title />
      <div className="flex px-2 w-auto">
        <ul className="flex space-x-3 items-center  font-custom-font text-lg  cursor-pointer ">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/aboutus">AboutUs</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/instamart">InstaMart</Link></li>
          <li >
            {isLoggedIn ? (
              <button className="mr-10" onClick={() => { setIsLoggedIn(false) }}>
                <div >
                  Logout
                </div>
              </button>
            ) : (
              <button className="mr-10"  onClick={() => { setIsLoggedIn(true) }}>
                <div>
                  Login
                </div>
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
 
export default Header;
