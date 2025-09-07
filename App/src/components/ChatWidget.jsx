import React, { useState } from "react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
  };

  return (
    <>
     {/* Floating Chat Button */}
{!isOpen && (
  <button
    onClick={() => setIsOpen(true)}
    className="fixed bottom-5 right-5 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center"
  >
    <span className="text-3xl">💬</span>
  </button>
)}


      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 w-80 h-96 bg-white shadow-2xl rounded-2xl flex flex-col border">
          {/* Header */}
          <div className="flex justify-between items-center p-3 bg-blue-600 text-white rounded-t-2xl">
            <h2 className="text-sm font-semibold">Chat Support</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="font-bold text-lg hover:text-red-500"
            >
              ❌
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3 overflow-y-auto text-sm space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white self-end ml-auto"
                    : "bg-gray-200 text-black self-start mr-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-2 border-t flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-2 py-1 border rounded-lg text-sm focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-blue-600 text-white px-3 py-1 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
