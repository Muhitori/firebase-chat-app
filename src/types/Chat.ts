export interface Conversation {
  id: string;
  user1Id: string;
  user2Id: string;
}

export interface Message {
  conversationId: string;
  userId: string;
  message: string;
  date?: Date;
}