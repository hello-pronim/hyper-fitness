import "./index.css";
import { useRef, useState } from "react";

const ChatInput = ({ disabled, value, setValue, handleSubmit }) => {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit(e);
  };
  const handleShowBtnClicked = () => {
    setShowInput(true);
    inputRef.current.focus();
  };
  const handleCloseBtnClicked = () => {
    setShowInput(false);
    setValue("");
  };

  return (
    <div
      className={`chat-input ${showInput ? "active" : ""} ${
        disabled ? "disabled" : ""
      }`}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type here..."
        ref={inputRef}
        disabled={disabled}
      />
      {!showInput ? (
        <div className="show-btn" onClick={handleShowBtnClicked}></div>
      ) : (
        <div className="close-btn" onClick={handleCloseBtnClicked}>
          <i className="fa fa-times" />
        </div>
      )}
    </div>
  );
};

export default ChatInput;
