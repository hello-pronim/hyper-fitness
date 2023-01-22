import "./index.css";
import HyperSVGLogo from "../HyperSVGLogo";

// Individual Chat Message
const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
          {message.user === "gpt" ? (
            <HyperSVGLogo />
          ) : (
            <i className="fa fa-user" />
          )}
        </div>
        <div className="chat-message-text">{message.message}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
