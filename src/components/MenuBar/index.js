import React from "react";

import "./index.css";

const MenuBar = ({ chatInput, setChatInput, handleSubmit }) => (
  <div className="menu-bar">
    <div className="orb-container radius">
      <div className="circle radius">
        <form className="form" onSubmit={handleSubmit}>
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className="chat-input radius"
          ></input>
        </form>
        <div className="radius noise"></div>
      </div>
    </div>
  </div>
);

export default MenuBar;
