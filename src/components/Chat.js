import React, { useEffect, useState, useContext } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { ReactComponent as LikeIcon } from '../images/like.svg';
import { ReactComponent as DislikeIcon } from '../images/dislike.svg';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
const socket = socketIOClient(backendUrl);

const Chat = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [reactionStates, setReactionStates] = useState({});

  useEffect(() => {
    axios.get(`${backendUrl}/api/departmentHead/addmessage`).then((res) => {
      setMessages(res.data.reverse()); // Show latest messages at top initially
    });

    socket.on('previousMessages', (msgs) => {
      setMessages(msgs.reverse()); // reverse messages when received initially
    });

    socket.on('newMessage', (msg) => {
      setMessages((prev) => [msg, ...prev]); // Add new message to the top
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
        timestamp: new Date().toISOString(),
        likes: 0,
        dislikes: 0,
      };
      socket.emit('newMessage', msgData);
      setMessage('');
    }
  };

  const handleReaction = async (msgId, index, type) => {
    const currentReaction = reactionStates[msgId];
    const newType = currentReaction === type ? 'neutral' : type;

    try {
      const res = await axios.patch(`${backendUrl}/api/departmentHead/${msgId}/reaction`, { type: newType, user: user.name });
      const updatedMsg = res.data;

      setMessages((prev) =>
        prev.map((msg, i) => (msg._id === msgId ? { ...msg, ...updatedMsg } : msg))
      );

      setReactionStates((prev) => ({
        ...prev,
        [msgId]: newType === 'neutral' ? null : newType,
      }));
    } catch (err) {
      console.error('Failed to update reaction:', err);
    }
  };

  const formatTime = (timestamp) => {
    const time = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - time) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);
    const months = Math.floor(diffInSeconds / (30 * 86400));
    const years = Math.floor(diffInSeconds / (365 * 86400));

    if (diffInSeconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;
    if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;
    return `${years} year${years !== 1 ? 's' : ''} ago`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
          {user?.name ? `Comments as ${user.name}` : 'Comments'}
        </h2>

        {/* Message Input at the top */}
        <div className="flex flex-col space-y-4 mb-8">
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a comment..."
            className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <div className="flex justify-end">
            <button
              onClick={sendMessage}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
              disabled={!message.trim()}
            >
              Comment
            </button>
          </div>
        </div>

        {/* Messages List below input */}
        <div className="space-y-6">
          {messages.map((msg, i) => (
            <div key={msg._id} className="flex items-start space-x-4 bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white">
                {msg.user.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-semibold">{msg.user}</p>
                  <span className="text-xs text-gray-400">{formatTime(msg.timestamp)}</span>
                </div>
                <p className="text-gray-200 mt-1">{msg.message}</p>
                <div className="flex items-center space-x-4 text-sm mt-2">
                  <button
                    onClick={() => handleReaction(msg._id, i, 'like')}
                    className="flex items-center justify-center"
                  >
                    <LikeIcon
                      className={`w-6 h-6 transition-all duration-200 ${
                        reactionStates[msg._id] === 'like' ? 'fill-white' : 'fill-gray-400'
                      }`}
                    />
                    <span className="ml-1">{msg.likes || 0}</span>
                  </button>
                  <button
                    onClick={() => handleReaction(msg._id, i, 'dislike')}
                    className="flex items-center justify-center"
                  >
                    <DislikeIcon
                      className={`w-6 h-6 transition-all duration-200 ${
                        reactionStates[msg._id] === 'dislike' ? 'fill-white' : 'fill-gray-400'
                      }`}
                    />
                    <span className="ml-1">{msg.dislikes || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
