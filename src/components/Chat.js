import React, { useEffect, useState, useContext } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
const socket = socketIOClient(backendUrl);

const Chat = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`${backendUrl}/api/messages`).then((res) => {
      setMessages(res.data);
    });

    socket.on('previousMessages', (msgs) => {
      setMessages(msgs);
    });

    socket.on('newMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('previousMessages');
      socket.off('newMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message && user?.name) {
      const msgData = {
        user: user.name,
        message,
      };
      socket.emit('newMessage', msgData);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-mono p-4 animate-fade-in">
      <div className="w-full max-w-2xl glass border border-pink-600/40 rounded-3xl shadow-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-800/10 via-pink-500/10 to-purple-800/10 rounded-3xl pointer-events-none animate-pulse" />
        
        <h1 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-typewriter">
          {`💬 Hey ${user?.name || 'Guest'}, Welcome to NeonChat!`}
        </h1>

        <div className="h-64 overflow-y-auto border border-white/10 bg-white/10 rounded-xl p-4 backdrop-blur-sm mb-4 space-y-2 scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-transparent">
          {messages.map((msg, i) => (
            <div key={i} className="flex items-start space-x-2">
              <span className="font-bold text-pink-400">{msg.user}</span>
              <span>{msg.message}</span>
            </div>
          ))}
        </div>

        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="🚀 Type a message..."
          className="w-full bg-white/10 text-white p-3 rounded-lg border border-purple-500/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 mb-4"
        />

        <button
          onClick={sendMessage}
          className="w-full py-3 text-white font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 rounded-xl shadow-lg hover:shadow-pink-700/50 transition-all duration-300 animate-glow"
        >
          ⚡ Send Message
        </button>
      </div>
    </div>
  );
};

export default Chat;
