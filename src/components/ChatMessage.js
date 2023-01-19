import HyperSVGLogo from "./HyperSVGLogo";

// Individual Chat Message
const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
          {message.user === "gpt" ? <HyperSVGLogo /> : <div></div>}
        </div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
