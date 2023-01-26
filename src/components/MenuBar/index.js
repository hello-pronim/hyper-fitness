import React from "react";
import ChatInput from "../ChatInput";

import "./index.css";

const MenuBar = ({ disabled, chatInput, setChatInput, handleSubmit }) => (
  <div className="menu-bar">
    <div className="menu-container">
      <ChatInput
        disabled={disabled}
        value={chatInput}
        setValue={setChatInput}
        handleSubmit={handleSubmit}
      />
    </div>
    {/* <div className="orb-container radius">
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
    </div> */}
  </div>
);

export default MenuBar;
