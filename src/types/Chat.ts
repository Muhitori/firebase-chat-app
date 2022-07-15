import { Timestamp } from 'firebase/firestore';

export interface Conversation {
  id: string;
  user1Id: string;
  user2Id: string;
  updatedAt: Timestamp;
}

export interface Message {
  conversationId: string;
  userId: string;
  message: string;
  userName: string | null;
  date?: Date;
}