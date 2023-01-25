import "./index.css";

import { useState } from "react";

import ChatMessage from "../../components/ChatMessage";
import MenuBar from "../../components/MenuBar";

const Home = () => {
  const [chatInput, setChatInput] = useState("");
  const [currentModel, setCurrentModel] = useState("text-davinci-003");
  const [chatLog, setChatLog] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${chatInput}` }];
    setChatInput("");
    setChatLog(chatLogNew);
    // fetch response to the api combining the chat log array of messages and seinding it as a message to localhost:3000 as a post
    const messages = chatLogNew.map((message) => message.message).join("\n");

    const response = await fetch(process.env.REACT_APP_RENDER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messages,
        currentModel,
      }),
    });
    const data = await response.json();
    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }]);
    var scrollToTheBottomChatLog =
      document.getElementsByClassName("chat-log")[0];
    scrollToTheBottomChatLog.scrollTop = scrollToTheBottomChatLog.scrollHeight;
  };

  return (
    <div className="home">
      {/* <SideBar /> */}
      <div className="page-container">
        <div className="chat-log">
          <div className="chat-log-container">
            {chatLog.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
          </div>
        </div>
        <MenuBar
          chatInput={chatInput}
          setChatInput={setChatInput}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Home;
