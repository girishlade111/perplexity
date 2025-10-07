export interface SearchResult {
  id: string;
  query: string;
  response: string;
  sources: Source[];
  followUpQuestions: string[];
  timestamp: Date;
  isLoading?: boolean;
}

export interface Source {
  id: string;
  title: string;
  url: string;
  snippet: string;
  domain: string;
}

export interface Conversation {
  id: string;
  title: string;
  searches: SearchResult[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isPro: boolean;
}

export type Theme = 'light' | 'dark';