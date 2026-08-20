
import React, { useState } from 'react';
import { X, Send, Phone, Calendar, MessageSquare, MapPin } from 'lucide-react';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to DIGI-TEC. How can I assist you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const quickActions = [
    { icon: Phone, text: 'Book a service', action: 'book' },
    { icon: MessageSquare, text: 'Ask a question', action: 'question' },
    { icon: Calendar, text: 'Get a quote', action: 'quote' },
    { icon: MapPin, text: 'Track my car', action: 'track' }
  ];

  const handleQuickAction = (action: string, text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate response
    setTimeout(() => {
      let response = '';
      switch (action) {
        case 'book':
          response = 'To discuss a workshop appointment, call or WhatsApp +971 4 340 2223 and share the model, year and requested work. Digi-Tec is in Al Quoz Industrial Area 3, Warehouses 11–15, Dubai.';
          break;
        case 'question':
          response = 'What would you like to know about the listed maintenance, inspection, repair or performance-project services? Coverage is confirmed for the exact vehicle before booking.';
          break;
        case 'quote':
          response = 'For an estimate, call or WhatsApp +971 4 340 2223. Pricing depends on the exact vehicle, inspection findings, parts and approved scope.';
          break;
        case 'track':
          response = 'For an update on a vehicle already at the workshop, call or WhatsApp +971 4 340 2223 with your name and vehicle details.';
          break;
        default:
          response = 'How can I help you today?';
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    
    // Simulate response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'This on-page assistant does not send messages to the workshop. Please call or WhatsApp +971 4 340 2223 to contact the Digi-Tec team.',
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`
      fixed bottom-6 right-6 z-50 w-80 h-96 
      bg-charcoal border border-burnt-orange/20 rounded-2xl shadow-2xl
      transition-all duration-300 ease-out
      ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
      flex flex-col overflow-hidden
    `}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black border-b border-burnt-orange/20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-burnt-orange rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">DIGI-TEC Support</h3>
            <p className="text-gray-400 text-xs">Usually replies instantly</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-black/50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-[80%] p-3 rounded-2xl text-sm
                ${message.isUser 
                  ? 'bg-burnt-orange text-white' 
                  : 'bg-charcoal text-off-white border border-gray-700'
                }
              `}
            >
              {message.text}
            </div>
          </div>
        ))}

        {/* Quick Actions - only show initially */}
        {messages.length === 1 && (
          <div className="grid grid-cols-2 gap-2 mt-4">
            {quickActions.map((action) => (
              <button
                key={action.action}
                onClick={() => handleQuickAction(action.action, action.text)}
                className="flex items-center space-x-2 p-2 bg-charcoal hover:bg-burnt-orange/20 rounded-lg transition-colors duration-200 border border-gray-700 hover:border-burnt-orange/50"
              >
                <action.icon className="w-4 h-4 text-burnt-orange" />
                <span className="text-xs text-off-white">{action.text}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-black border-t border-burnt-orange/20">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-charcoal text-white placeholder-gray-400 px-3 py-2 rounded-lg border border-gray-700 focus:border-burnt-orange focus:outline-none text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="bg-burnt-orange hover:bg-burnt-orange/90 disabled:bg-gray-600 text-white p-2 rounded-lg transition-colors duration-200"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
