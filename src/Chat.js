import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './index.css';

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
});
const openai = new OpenAIApi(configuration);
  
const model = "text-davinci-003";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessages([...messages, { text: inputText, user: true }]);
    setInputText("");

    const response = await openai.createCompletion(
    {
      model: model,
      prompt: inputText,
      max_tokens: 250,
      n: 1,
      temperature: 0.5,
    });

    const botMessage = response.data.choices[0].text.trim();
    setTimeout(() => {
      setMessages([...messages, { text: botMessage, user: false }]);
    }, 500);
  };

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div class="chat-window">
      <div class="chat-header">
        <h1>ChatGPT Clone</h1>
      </div>
      <div class="chat-body">
        <div class="chat-messages">
          {messages[messages.length-1]?.text}
        </div>
        <form class="chat-form" onSubmit={handleSubmit}>
          <input
          className="chat-input"
          placeholder="Type a message..."
          type="text"
          value={inputText}
          onChange={handleChange}
        />
          <button type="submit" class="chat-submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
