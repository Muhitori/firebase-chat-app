export interface Conversation {
  user1: string;
  user2: string;
}

export interface Message {
  userId: string;
  avatar?: string;
  message: string;
  date: Date;
}