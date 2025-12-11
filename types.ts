export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface AgentConfig {
  id: string;
  name: string;
  roleName: string;
  description: string;
  iconKey: string; // Changed from avatarEmoji to iconKey for Lucide icons
  themeColor: string; // Tailwind class prefix, e.g., 'red', 'blue'
  welcomeMessage: string;
  systemPrompt: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}
