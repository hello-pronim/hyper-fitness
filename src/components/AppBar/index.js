import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./index.css";
import { AuthContext } from "../../contexts/AuthContext";

const AppBar = () => {
  const navigate = useNavigate();
  const { user, signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
    navigate("/sign-in");
  };

  return (
    <div className="app-bar">
      <div className="app-bar-logo-wrapper">
        <div className="app-bar-logo">
          <Link to="/">
            <img
              className="app-bar-logo-img"
              src="/hyper_logo.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="app-bar-title"></div>
      </div>
      <div className="app-bar-menu-wrapper">
        <ul className="app-bar-menu">
          {user ? (
            <li className="app-bar-menu-item" onClick={handleSignOut}>
              Sign out
            </li>
          ) : (
            <li className="app-bar-menu-item">
              <Link to="/sign-in">Sign in</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default AppBar;
