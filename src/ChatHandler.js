import { useEffect, useRef } from 'react';

function ChatHandler() {
  const inputRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && circleRef.current) {
      inputRef.current.addEventListener('focus', function() {
        circleRef.current.style.width = inputRef.current.offsetWidth + 'px';
        inputRef.current.placeholder = "Hey Hyper...";
      });
  
      inputRef.current.addEventListener('blur', function() {
        circleRef.current.style.width = '68px';
        inputRef.current.placeholder = "";
      });
    }
  }, []);

  return (
    <div>
      <input ref={inputRef} className="chat-input" />
      <div ref={circleRef} className="circle"></div>
    </div>
  );
}

export default ChatHandler;
