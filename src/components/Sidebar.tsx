import React from 'react';
import { Theme, Conversation } from '../types';
import { MessageSquare, Plus, Trash2, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SidebarProps {
  theme: Theme;
  conversations: Conversation[];
  currentConversationId: string | null;
  onConversationSelect: (conversationId: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (conversationId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  theme,
  conversations,
  currentConversationId,
  onConversationSelect,
  onNewConversation,
  onDeleteConversation,
  isOpen,
  onClose
}) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full z-50 transform transition-transform duration-300
        lg:relative lg:transform-none lg:z-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-80 border-r
        ${theme === 'dark' 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-white border-gray-200'
        }
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <button
              onClick={onNewConversation}
              className={`
                w-full flex items-center justify-center px-4 py-2 rounded-lg
                transition-colors font-medium text-sm
                ${theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300'
                }
              `}
            >
              <Plus size={16} className="mr-2" />
              New Conversation
            </button>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`
                    group relative rounded-lg transition-colors
                    ${currentConversationId === conversation.id
                      ? theme === 'dark'
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-blue-50 border border-blue-200'
                      : theme === 'dark'
                        ? 'hover:bg-gray-800'
                        : 'hover:bg-gray-100'
                    }
                  `}
                >
                  <button
                    onClick={() => onConversationSelect(conversation.id)}
                    className="w-full text-left p-3 rounded-lg"
                  >
                    <div className="flex items-start">
                      <MessageSquare size={16} className={`
                        mr-3 mt-0.5 flex-shrink-0
                        ${currentConversationId === conversation.id
                          ? theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                          : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }
                      `} />
                      <div className="flex-1 min-w-0">
                        <h3 className={`
                          text-sm font-medium truncate
                          ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
                        `}>
                          {conversation.title}
                        </h3>
                        <p className={`
                          text-xs mt-1 flex items-center
                          ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
                        `}>
                          <Clock size={12} className="mr-1" />
                          {formatDistanceToNow(new Date(conversation.updatedAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => onDeleteConversation(conversation.id)}
                    className={`
                      absolute right-2 top-2 p-1.5 rounded opacity-0 
                      group-hover:opacity-100 transition-opacity
                      ${theme === 'dark'
                        ? 'hover:bg-gray-700 text-gray-400 hover:text-red-400'
                        : 'hover:bg-gray-200 text-gray-500 hover:text-red-600'
                      }
                    `}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}

              {conversations.length === 0 && (
                <div className={`
                  text-center py-8
                  ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
                `}>
                  <MessageSquare size={24} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No conversations yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};