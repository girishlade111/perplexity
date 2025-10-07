import React from 'react';
import { SearchResult as SearchResultType, Theme } from '../types';
import { ExternalLink, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SearchResultProps {
  result: SearchResultType;
  theme: Theme;
  onFollowUpClick: (question: string) => void;
}

export const SearchResult: React.FC<SearchResultProps> = ({
  result,
  theme,
  onFollowUpClick
}) => {
  if (result.isLoading) {
    return (
      <div className={`
        p-6 rounded-2xl border
        ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      `}>
        <div className="animate-pulse">
          <div className={`
            h-4 rounded mb-4
            ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}
          `} />
          <div className={`
            h-4 rounded mb-4 w-3/4
            ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}
          `} />
          <div className={`
            h-4 rounded w-1/2
            ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}
          `} />
        </div>
      </div>
    );
  }

  return (
    <div className={`
      rounded-2xl border transition-all duration-200
      ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      shadow-sm hover:shadow-md
    `}>
      {/* Query Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className={`
            text-lg font-medium
            ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
          `}>
            {result.query}
          </h2>
          <div className={`
            flex items-center text-sm
            ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
          `}>
            <Clock size={14} className="mr-1" />
            {formatDistanceToNow(result.timestamp, { addSuffix: true })}
          </div>
        </div>

        {/* AI Response */}
        <div className={`
          prose max-w-none text-base leading-relaxed
          ${theme === 'dark' ? 'prose-invert' : ''}
          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
        `}>
          <div 
            className="formatted-response"
            dangerouslySetInnerHTML={{ 
              __html: formatResponseHTML(result.response, theme) 
            }} 
          />
        </div>
      </div>

      {/* Sources */}
      {result.sources.length > 0 && (
        <div className={`
          px-6 pb-4 border-t
          ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
        `}>
          <h3 className={`
            text-sm font-medium mb-3 mt-4
            ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
          `}>
            Sources
          </h3>
          <div className="grid gap-3">
            {result.sources.map((source, index) => (
              <a
                key={index}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  block p-3 rounded-lg border transition-colors group
                  ${theme === 'dark'
                    ? 'border-gray-700 hover:border-gray-600 hover:bg-gray-750'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className={`
                      text-sm font-medium truncate
                      ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
                      group-hover:text-blue-600
                    `}>
                      {source.title}
                    </h4>
                    <p className={`
                      text-xs mt-1 line-clamp-2
                      ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
                    `}>
                      {source.snippet}
                    </p>
                    <p className={`
                      text-xs mt-1 font-mono
                      ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}
                    `}>
                      {source.domain}
                    </p>
                  </div>
                  <ExternalLink size={14} className={`
                    ml-2 flex-shrink-0
                    ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}
                    group-hover:text-blue-600
                  `} />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Follow-up Questions */}
      {result.followUpQuestions.length > 0 && (
        <div className={`
          px-6 pb-6 border-t
          ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
        `}>
          <h3 className={`
            text-sm font-medium mb-3 mt-4
            ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
          `}>
            Follow-up questions
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.followUpQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => onFollowUpClick(question)}
                className={`
                  text-left px-3 py-2 text-sm rounded-lg transition-colors
                  ${theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }
                  hover:shadow-sm
                `}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
// Helper function to convert markdown-style formatting to HTML
const formatResponseHTML = (response: string, theme: Theme): string => {
  return response
    // Convert **bold** to HTML bold
    .replace(/\*\*(.*?)\*\*/g, `<strong class="${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-semibold">$1</strong>`)
    // Convert bullet points to HTML lists
    .replace(/^• (.+)$/gm, '<li class="mb-2">$1</li>')
    // Wrap consecutive list items in ul tags
    .replace(/(<li.*?<\/li>\s*)+/g, '<ul class="list-disc list-inside mb-4 space-y-2">$&</ul>')
    // Convert double line breaks to paragraph breaks
    .replace(/\n\n/g, '</p><p class="mb-4">')
    // Wrap in paragraph tags
    .replace(/^(.+)$/gm, '<p class="mb-4">$1</p>')
    // Clean up empty paragraphs
    .replace(/<p class="mb-4"><\/p>/g, '')
    // Fix nested paragraph issues
    .replace(/<p class="mb-4">(<ul.*?<\/ul>)<\/p>/g, '$1')
    .replace(/<p class="mb-4">(<strong.*?<\/strong>)<\/p>/g, '<p class="mb-4">$1</p>');
};