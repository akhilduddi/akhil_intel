import { useState, useEffect, useRef } from "react";
import { Send, Loader2, X, MessageCircle, Bot } from "lucide-react";
import "./chat.css";
import styled from 'styled-components';

// Get API key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Debug environment variables
console.log('Environment Variables Debug:');
console.log('VITE_GEMINI_API_KEY exists:', !!import.meta.env.VITE_GEMINI_API_KEY);
console.log('VITE_GEMINI_API_KEY length:', import.meta.env.VITE_GEMINI_API_KEY?.length);
console.log('All env variables:', import.meta.env);
console.log('Current working directory:', window.location.href);

if (!API_KEY) {
  console.error('API key is missing. Environment variables:', import.meta.env);
  console.error('API key is not configured. Please check your environment variables. Make sure you have created a .env file in the IntelFrontend directory with VITE_GEMINI_API_KEY=your_api_key');
}

const JunnuChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const chatEndRef = useRef(null);
  const [error, setError] = useState(null);

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
      console.error('API key is missing. Environment variables:', import.meta.env);
      setError('API key is not configured. Please check your environment variables. Make sure you have created a .env file in the IntelFrontend directory with VITE_GEMINI_API_KEY=your_api_key');
      setMessages(prev => [...prev, {
        text: 'Error: API key is not configured. Please check your environment variables. Make sure you have created a .env file in the IntelFrontend directory with VITE_GEMINI_API_KEY=your_api_key',
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
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Chintu, a helpful AI assistant. Please provide a clear and concise response to: ${input}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
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