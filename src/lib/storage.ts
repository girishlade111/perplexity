import { Conversation, SearchResult } from '../types';

const STORAGE_KEYS = {
  CONVERSATIONS: 'perplexity_conversations',
  CURRENT_CONVERSATION: 'perplexity_current_conversation',
  THEME: 'perplexity_theme',
  USER: 'perplexity_user'
};

export const storage = {
  getConversations: (): Conversation[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    return stored ? JSON.parse(stored) : [];
  },

  saveConversations: (conversations: Conversation[]): void => {
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
  },

  getCurrentConversation: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_CONVERSATION);
  },

  setCurrentConversation: (conversationId: string): void => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_CONVERSATION, conversationId);
  },

  getTheme: (): 'light' | 'dark' => {
    return (localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark') || 'light';
  },

  setTheme: (theme: 'light' | 'dark'): void => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  addSearchToConversation: (conversationId: string, search: SearchResult): void => {
    const conversations = storage.getConversations();
    const conversationIndex = conversations.findIndex(c => c.id === conversationId);
    
    if (conversationIndex >= 0) {
      conversations[conversationIndex].searches.push(search);
      conversations[conversationIndex].updatedAt = new Date();
      storage.saveConversations(conversations);
    }
  },

  createConversation: (firstSearch: SearchResult): Conversation => {
    const conversation: Conversation = {
      id: Date.now().toString(),
      title: firstSearch.query.slice(0, 50) + (firstSearch.query.length > 50 ? '...' : ''),
      searches: [firstSearch],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const conversations = storage.getConversations();
    conversations.unshift(conversation);
    storage.saveConversations(conversations);
    storage.setCurrentConversation(conversation.id);

    return conversation;
  }
};