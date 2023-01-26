import "./index.css";

import { useState, useEffect } from "react";

import ChatMessage from "../../components/ChatMessage";
import MenuBar from "../../components/MenuBar";
import SideBar from "../../components/SideBar";

const Home = () => {
  const [chatInput, setChatInput] = useState("");
  const [models, setModels] = useState([]);
  const [temperature, setTemperature] = useState(0.5);
  const [currentModel, setCurrentModel] = useState("text-davinci-003");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getEngines();
  }, []);

  const getEngines = () => {
    fetch(`${process.env.REACT_APP_API_URL}/models`)
      .then((res) => res.json())
      .then((data) => {
        // set models in order alphabetically
        data.models.data.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        });
        setModels(data.models.data);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let chatLogNew = [...chatLog, { user: "me", message: `${chatInput}` }];
    setChatInput("");
    setChatLog(chatLogNew);
    // fetch response to the api combining the chat log array of messages and seinding it as a message to localhost:3000 as a post
    const messages = chatLogNew.map((message) => message.message).join("\n");
    setLoading(true);
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
    setLoading(false);
    const data = await response.json();
    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }]);
    var scrollToTheBottomChatLog =
      document.getElementsByClassName("chat-log")[0];
    scrollToTheBottomChatLog.scrollTop = scrollToTheBottomChatLog.scrollHeight;
  };

  const handleTemp = (temp) => {
    if (temp > 1) {
      setTemperature(1);
    } else if (temp < 0) {
      setTemperature(0);
    } else {
      setTemperature(temp);
    }
  };

  // clear chats
  const clearChat = () => {
    setChatLog([]);
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
            {loading ? (
              <ChatMessage
                message={{
                  user: "gpt",
                  message: <i className="fa fa-spinner fa-pulse" />,
                  // message: "Here's the answer you want",
                }}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <MenuBar
          disabled={loading}
          chatInput={chatInput}
          setChatInput={setChatInput}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Home;
