import React from 'react';
import { Search, Moon, Sun, Menu, Settings, Plus } from 'lucide-react';
import { Theme } from '../types';

interface HeaderProps {
  theme: Theme;
  onThemeToggle: () => void;
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
  onNewConversation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  theme, 
  onThemeToggle, 
  onMenuToggle,
  isSidebarOpen,
  onNewConversation
}) => {
  return (
    <header className={`
      sticky top-0 z-50 border-b transition-colors duration-200
      ${theme === 'dark' 
        ? 'bg-gray-900/95 border-gray-800 backdrop-blur-sm' 
        : 'bg-white/95 border-gray-200 backdrop-blur-sm'
      }
    `}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuToggle}
              className={`
                p-2 rounded-lg transition-colors lg:hidden
                ${theme === 'dark'
                  ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }
              `}
            >
              <Menu size={20} />
            </button>
            
            <div className="flex items-center space-x-2">
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center
                ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'}
              `}>
                <Search size={18} className="text-white" />
              </div>
              <h1 className={`
                text-xl font-semibold
                ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
              `}>
                Perplexity
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onNewConversation}
              className={`
                hidden sm:flex items-center px-3 py-2 rounded-lg transition-colors
                text-sm font-medium
                ${theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 border border-gray-300'
                }
              `}
            >
              <Plus size={16} className="mr-2" />
              New Chat
            </button>
            
            <button
              onClick={onThemeToggle}
              className={`
                p-2 rounded-lg transition-colors
                ${theme === 'dark'
                  ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }
              `}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              className={`
                p-2 rounded-lg transition-colors
                ${theme === 'dark'
                  ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }
              `}
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};