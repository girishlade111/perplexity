import { useState, useEffect } from 'react';
import { Conversation, SearchResult } from '../types';
import { storage } from '../lib/storage';

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);

  useEffect(() => {
    const storedConversations = storage.getConversations();
    const currentId = storage.getCurrentConversation();
    
    setConversations(storedConversations);
    setCurrentConversationId(currentId);
  }, []);

  const createConversation = (firstSearch: SearchResult): Conversation => {
    const conversation = storage.createConversation(firstSearch);
    setConversations(prev => [conversation, ...prev]);
    setCurrentConversationId(conversation.id);
    return conversation;
  };

  const addSearchToConversation = (conversationId: string, search: SearchResult) => {
    storage.addSearchToConversation(conversationId, search);
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, searches: [...conv.searches, search], updatedAt: new Date() }
          : conv
      )
    );
  };

  const selectConversation = (conversationId: string) => {
    setCurrentConversationId(conversationId);
    storage.setCurrentConversation(conversationId);
  };

  const deleteConversation = (conversationId: string) => {
    const updatedConversations = conversations.filter(conv => conv.id !== conversationId);
    setConversations(updatedConversations);
    storage.saveConversations(updatedConversations);
    
    if (currentConversationId === conversationId) {
      const newCurrentId = updatedConversations.length > 0 ? updatedConversations[0].id : null;
      setCurrentConversationId(newCurrentId);
      if (newCurrentId) {
        storage.setCurrentConversation(newCurrentId);
      }
    }
  };

  const newConversation = () => {
    setCurrentConversationId(null);
  };

  const getCurrentConversation = (): Conversation | null => {
    return conversations.find(conv => conv.id === currentConversationId) || null;
  };

  return {
    conversations,
    currentConversationId,
    createConversation,
    addSearchToConversation,
    selectConversation,
    deleteConversation,
    newConversation,
    getCurrentConversation
  };
};