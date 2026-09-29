
import React, { useState } from 'react';
import { ChatBotIcon } from './ChatBotIcon';
import { ChatWindow } from './ChatWindow';

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ChatBotIcon onClick={toggleChat} isOpen={isOpen} />
      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
