import { useState, useEffect, useRef } from "react";
import { Send, Loader2, X, MessageCircle, Bot } from "lucide-react";
import "./chat.css";
import styled from 'styled-components';

// Get API key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Log API key status (remove in production)
console.log('API Key available:', !!API_KEY);

const JunnuChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle escape key to close chat
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Handle mobile view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480 && isOpen) {
        setIsMinimized(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!API_KEY) {
      console.error('API key is not available');
      setMessages(prev => [...prev, {
        text: 'Error: API key is not configured. Please check your environment variables.',
        sender: 'bot',
        timestamp: new Date()
      }]);
      return;
    }

    // Add user message
    const userMessage = { 
      text: input, 
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      console.log('Making API request...');
      // Make API call using the environment variable
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: input
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
        throw new Error('Invalid response from API');
      }

      // Add bot response
      const botMessage = {
        text: data.candidates[0].content.parts[0].text,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      // Add error message
      const errorMessage = {
        text: `Sorry, I encountered an error: ${error.message}. Please try again.`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={`junnu-chatbot-container ${isOpen ? 'open' : ''}`}>
      {isOpen ? (
        <div className={`junnu-chatbox ${isMinimized ? 'minimized' : ''}`}>
          <div className="junnu-chatbox-header">
            <div className="header-left">
              <div className="junnu-avatar">
                <Bot size={18} />
              </div>
              <div>
                <h3>Chintu AI Assistant</h3>
                <p className="status">
                  {loading ? 'Typing...' : 'Online'}
                  <span className={`status-indicator ${loading ? 'typing' : 'online'}`}></span>
                </p>
              </div>
            </div>
            <div className="header-actions">
              {window.innerWidth > 480 && (
                <button 
                  className="minimize-button"
                  onClick={(e) => { e.preventDefault(); setIsMinimized(!isMinimized); }}
                  aria-label={isMinimized ? "Maximize" : "Minimize"}
                >
                  {isMinimized ? '+' : '-'}
                </button>
              )}
              <button 
                className="close-button"
                onClick={(e) => { e.preventDefault(); setIsOpen(false); }}
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              <div className="junnu-chatbox-body">
                {messages.length === 0 ? (
                  <div className="welcome-screen">
                    <div className="welcome-avatar">
                      <Bot size={40} />
                    </div>
                    <h2>Chintu AI Assistant</h2>
                    <p>Hi there! I'm Chintu, your AI assistant. How can I help you today?</p>
                    <div className="suggestions">
                      <button onClick={(e) => { e.preventDefault(); setInput("What can you do?"); }}>
                        What can you do?
                      </button>
                      <button onClick={(e) => { e.preventDefault(); setInput("How does this work?"); }}>
                        How does this work?
                      </button>
                    </div>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`junnu-message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
                    >
                      {msg.sender === "bot" && (
                        <div className="junnu-bot-avatar">
                          <Bot size={16} />
                        </div>
                      )}
                      <div className="message-content">
                        <div className="message-text">
                          {msg.text.split('\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                          ))}
                        </div>
                        <div className="message-time">
                          {formatTime(msg.timestamp)}
                        </div>
                      </div>
                      {msg.sender === "user" && (
                        <div className="junnu-user-avatar">
                          <span>You</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
                <div ref={chatEndRef} />
              </div>
              
              <div className="junnu-chatbox-footer">
                <div className="input-container">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    disabled={loading}
                  />
                  <button 
                    onClick={handleSubmit} 
                    disabled={loading || !input.trim()}
                    className="send-button"
                    aria-label="Send message"
                  >
                    {loading ? <Loader2 className="spin" /> : <Send size={18} />}
                  </button>
                </div>
                <div className="disclaimer">
                  Chintu AI may produce inaccurate information. Consider verifying important details.
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <button 
          className="junnu-floating-button"
          onClick={(e) => { e.preventDefault(); setIsOpen(true); }}
          aria-label="Open Junnu Chatbot"
        >
          <MessageCircle size={24} />
          <span>Chintu AI</span>
        </button>
      )}
    </div>
  );
};

export default JunnuChatbot;