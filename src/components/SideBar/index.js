import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";
import { AuthContext } from "../../contexts/AuthContext";

const SideBar = () => {
  const navigate = useNavigate();
  const { signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
    navigate("/sign-in");
  };

  return (
    <div className="side-bar">
      <div className="chats-menu-wrapper"></div>
      <div className="side-bar-menu-wrapper">
        <ul className="side-bar-menu">
          <li className="side-bar-menu-item" onClick={handleSignOut}>
            <div className="side-bar-menu-item-wrapper">
              <div className="side-bar-menu-item-icon">
                <i className="fa fa-sign-out" aria-hidden="true" />
              </div>
              <div className="side-bar-menu-item-text">Sign out</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
