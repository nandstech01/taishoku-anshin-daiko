export interface ChatMessage {
  text: string;
  isBot: boolean;
  options?: string[];
}

export interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ResponseMessage {
  text: string;
  delay: number;
  options?: string[];
}

export interface ConversationHistory {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  responses: ResponseMessage[];
  conversationHistory: ConversationHistory[];
} 