'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, ShieldAlert } from 'lucide-react';

export default function AgentView() {
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: 'LifeBridge AI Agent initialized. I am connected to the National Disaster Response grid. How can I assist you right now?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    
    const userMsg = { role: 'user', text: inputText };
    setChatMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setChatMessages((prev) => [...prev, { role: 'bot', text: data.reply }]);
      } else {
        setChatMessages((prev) => [...prev, { role: 'bot', text: `Error: ${data.error}` }]);
      }
    } catch (err) {
      setChatMessages((prev) => [...prev, { role: 'bot', text: 'Connection failed. Please check your network or try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 className="view-title"><Bot color="var(--accent-blue)" /> LifeBridge AI Command Center</h2>
      
      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
        
        {/* Chat Area */}
        <div 
          ref={chatMessagesRef}
          style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {chatMessages.map((msg, idx) => (
            <div 
              key={idx} 
              style={{ 
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.role === 'user' ? 'var(--accent-blue)' : 'var(--bg-input)',
                color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                padding: '12px 16px',
                borderRadius: '12px',
                maxWidth: '75%',
                borderBottomLeftRadius: msg.role === 'bot' ? '4px' : '12px',
                borderBottomRightRadius: msg.role === 'user' ? '4px' : '12px',
                lineHeight: '1.5',
                border: msg.role === 'bot' ? '1px solid var(--border-color)' : 'none'
              }}
            >
              {msg.role === 'bot' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: 'var(--accent-blue)', fontWeight: 'bold', fontSize: '0.85rem' }}>
                  <ShieldAlert size={14}/> SYSTEM
                </div>
              )}
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontStyle: 'italic', padding: '12px 16px' }}>
              Agent is analyzing situation...
            </div>
          )}
        </div>

        {/* Input Area */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-sidebar)', display: 'flex', gap: '12px' }}>
          <input 
            type="text" 
            className="input-field" 
            style={{ margin: 0, flex: 1, fontSize: '1rem', padding: '14px 20px', borderRadius: '30px' }}
            placeholder="Type your emergency query here..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            onClick={sendMessage}
            style={{ 
              backgroundColor: 'var(--accent-blue)', 
              color: 'white', 
              width: '50px', 
              height: '50px', 
              borderRadius: '25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-blue-hover)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-blue)'}
          >
            <Send size={20} />
          </button>
        </div>

      </div>
    </div>
  );
}
