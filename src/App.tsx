import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SearchInput } from './components/SearchInput';
import { SearchResult } from './components/SearchResult';
import { searchWithGemini } from './lib/gemini';
import { storage } from './lib/storage';
import { useConversations } from './hooks/useConversations';
import { SearchResult as SearchResultType, Theme } from './types';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSearch, setCurrentSearch] = useState<SearchResultType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    conversations,
    currentConversationId,
    createConversation,
    addSearchToConversation,
    selectConversation,
    deleteConversation,
    newConversation,
    getCurrentConversation
  } = useConversations();

  useEffect(() => {
    const storedTheme = storage.getTheme();
    setTheme(storedTheme);
    
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    storage.setTheme(newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSearch = async (query: string) => {
    const searchId = uuidv4();
    const newSearch: SearchResultType = {
      id: searchId,
      query,
      response: '',
      sources: [],
      followUpQuestions: [],
      timestamp: new Date(),
      isLoading: true
    };

    setCurrentSearch(newSearch);
    setIsLoading(true);

    try {
      const result = await searchWithGemini(query);
      
      const completedSearch: SearchResultType = {
        ...newSearch,
        response: result.response,
        sources: result.sources.map(source => ({
          id: uuidv4(),
          ...source
        })),
        followUpQuestions: result.followUpQuestions,
        isLoading: false
      };

      setCurrentSearch(completedSearch);

      // Add to conversation
      if (currentConversationId) {
        addSearchToConversation(currentConversationId, completedSearch);
      } else {
        createConversation(completedSearch);
      }

    } catch (error) {
      const errorSearch: SearchResultType = {
        ...newSearch,
        response: error instanceof Error ? error.message : 'An error occurred while searching.',
        sources: [],
        followUpQuestions: [],
        isLoading: false
      };
      
      setCurrentSearch(errorSearch);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConversationSelect = (conversationId: string) => {
    selectConversation(conversationId);
    const conversation = conversations.find(conv => conv.id === conversationId);
    if (conversation && conversation.searches.length > 0) {
      setCurrentSearch(conversation.searches[conversation.searches.length - 1]);
    }
    setIsSidebarOpen(false);
  };

  const handleNewConversation = () => {
    newConversation();
    setCurrentSearch(null);
    setIsSidebarOpen(false);
  };

  const currentConversation = getCurrentConversation();
  const allSearches = currentConversation?.searches || (currentSearch ? [currentSearch] : []);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="flex h-screen">
        <Sidebar
          theme={theme}
          conversations={conversations}
          currentConversationId={currentConversationId}
          onConversationSelect={handleConversationSelect}
          onNewConversation={handleNewConversation}
          onDeleteConversation={deleteConversation}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            theme={theme}
            onThemeToggle={toggleTheme}
            onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            isSidebarOpen={isSidebarOpen}
            onNewConversation={handleNewConversation}
          />

          <main className="flex-1 overflow-auto">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {allSearches.length === 0 ? (
                // Welcome screen
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className={`
                    w-16 h-16 rounded-2xl flex items-center justify-center mb-6
                    ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'}
                  `}>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <circle cx="11" cy="11" r="8"/>
                      <path d="21 21l-4.35-4.35"/>
                    </svg>
                  </div>
                  
                  <h1 className={`
                    text-4xl font-bold mb-4
                    ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
                  `}>
                    Where knowledge begins
                  </h1>
                  
                  <p className={`
                    text-xl mb-8 max-w-2xl
                    ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
                  `}>
                    Ask anything and get instant, accurate answers with citations from reliable sources.
                  </p>

                  <div className="w-full max-w-2xl">
                    <SearchInput
                      onSearch={handleSearch}
                      isLoading={isLoading}
                      theme={theme}
                      placeholder="Ask anything..."
                    />
                  </div>

                  {/* Sample questions */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                    {[
                      "What are the latest developments in AI?",
                      "How does quantum computing work?",
                      "Explain the impact of climate change",
                      "What is the future of renewable energy?"
                    ].map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(question)}
                        className={`
                          text-left p-4 rounded-xl transition-colors
                          ${theme === 'dark'
                            ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                            : 'bg-white hover:bg-gray-50 border border-gray-200'
                          }
                          shadow-sm hover:shadow-md
                        `}
                        disabled={isLoading}
                      >
                        <span className={`
                          text-sm
                          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
                        `}>
                          {question}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                // Search results
                <div className="space-y-6">
                  {allSearches.map((search) => (
                    <SearchResult
                      key={search.id}
                      result={search}
                      theme={theme}
                      onFollowUpClick={handleSearch}
                    />
                  ))}
                  
                  {/* Search input at bottom */}
                  <div className="sticky bottom-0 pt-6">
                    <div className={`
                      p-4 rounded-2xl border backdrop-blur-sm
                      ${theme === 'dark' 
                        ? 'bg-gray-900/95 border-gray-800' 
                        : 'bg-white/95 border-gray-200'
                      }
                    `}>
                      <SearchInput
                        onSearch={handleSearch}
                        isLoading={isLoading}
                        theme={theme}
                        placeholder="Ask a follow-up question..."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;