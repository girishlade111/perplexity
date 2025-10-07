import React, { useState, useRef } from 'react';
import { Search, ArrowUp } from 'lucide-react';
import { Theme } from '../types';

interface SearchInputProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  theme: Theme;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  isLoading,
  theme,
  placeholder = "Ask anything..."
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className={`
        relative rounded-2xl border transition-all duration-200
        ${theme === 'dark'
          ? 'bg-gray-800 border-gray-700 focus-within:border-gray-600'
          : 'bg-white border-gray-300 focus-within:border-gray-400'
        }
        ${isLoading ? 'opacity-50' : ''}
        shadow-lg focus-within:shadow-xl
      `}>
        <div className="flex items-start p-4">
          <Search 
            size={20} 
            className={`
              mr-3 mt-1 flex-shrink-0
              ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
            `} 
          />
          
          <textarea
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            rows={1}
            className={`
              flex-1 resize-none bg-transparent border-none outline-none
              placeholder:text-gray-500 text-base leading-relaxed
              ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
              min-h-[24px] max-h-32
            `}
            style={{
              height: 'auto',
              minHeight: '24px'
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = '24px';
              target.style.height = target.scrollHeight + 'px';
            }}
          />
          
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className={`
              ml-3 p-2 rounded-xl transition-all duration-200 flex-shrink-0
              ${query.trim() && !isLoading
                ? theme === 'dark'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
                : theme === 'dark'
                  ? 'bg-gray-700 text-gray-500'
                  : 'bg-gray-200 text-gray-400'
              }
              disabled:cursor-not-allowed
            `}
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </form>
  );
};