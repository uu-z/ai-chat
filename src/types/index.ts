export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  metaPrompt: string;
  category?: string;
  description?: string;
  rating?: number;
  downloads?: number;
  isNew?: boolean;
  isInstalled?: boolean;
  tags?: string[];
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  timestamp: number;
  isAgent: boolean;
}

export interface ChatGroup {
  id: string;
  name: string;
  messages: Message[];
  participants: Array<User | Agent>;
  isAutoCreated?: boolean;
  metaPromptTags?: string[];
}
