export interface Conversation {
  id: string;
  user1Id: string;
  user2Id: string;
}

export interface Message {
  conversationId: string;
  userId: string;
  avatar?: string;
  message: string;
  date?: Date;
}