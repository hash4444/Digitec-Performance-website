
import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatBotIconProps {
  onClick: () => void;
  isOpen: boolean;
}

export const ChatBotIcon: React.FC<ChatBotIconProps> = ({ onClick, isOpen }) => {
  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
        bg-burnt-orange hover:bg-burnt-orange/90 
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-out
        flex items-center justify-center
        group
        ${isOpen ? 'scale-0' : 'scale-100'}
      `}
      aria-label="Open chat"
    >
      <MessageCircle 
        className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" 
      />
    </button>
  );
};
