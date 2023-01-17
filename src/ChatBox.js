import HyperSVGLogo from './HyperSVGLogo.js'
import ChatHandler from './ChatHandler'

// Primary Chat Window
const ChatBox = ({chatLog, setChatInput, handleSubmit, chatInput}) =>
  <section className="chatbox">
      <div className="chat-log">
        {chatLog.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>
      <div className="menu-bar">
        <div className="orb-container radius">
        <div class="circle radius">
          <form className="form" onSubmit={handleSubmit}>
              <input
              value={chatInput}
              onChange={(e)=> setChatInput(e.target.value)}
              className="chat-input radius"></input>
          </form>
          <div class="radius noise"></div>
          </div>
        </div>
      </div>
      </section>

// Individual Chat Message
const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
    <div className="chat-message-center">
      <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
        {message.user === "gpt" ? <HyperSVGLogo /> : <div></div>}
      </div>
      <div className="message">
        {message.message}
      </div>
    </div>
  </div>
  )
}

export default ChatBox