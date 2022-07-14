import {
  getFirestore,
  collection,
  query,
  getDocs,
  doc,
  setDoc,
  getDoc,
  orderBy,
  addDoc,
  where,
  Timestamp,
  onSnapshot
} from 'firebase/firestore';
import { Message } from 'src/types/Chat';
import { AuthService } from './Auth.service';

const firestore = getFirestore();

export class ChatService {
  static async getConversation(uid: string) {
    const myId = AuthService.getCurrentUserId();

    if (!myId) return null;

    const conversationRef1 = await getDoc(doc(firestore, 'conversation', myId + uid));
    const conversationRef2 = await getDoc(doc(firestore, 'conversation', uid + myId));

    if (conversationRef1.exists()) {
      return conversationRef1.data();
    }

    if (conversationRef2.exists()) {
      return conversationRef2.data();
    }

    await this.createConversation(myId, uid);
    const conversationRef = await getDoc(doc(firestore, 'conversation', myId + uid));

    return conversationRef.data();
  }

  static async createConversation(user1Id: string, user2Id: string) {
    const conversationRef = await setDoc(
      doc(firestore, 'conversation', user1Id + user2Id),
      {
        id: user1Id + user2Id,
        user1Id,
        user2Id,
      }
    );

    return conversationRef;
  }

  static subscribeOn(conversationId: string, onUpdated: (messages: Message[]) => void) {
    return onSnapshot(
      doc(firestore, 'conversation', conversationId),
      async () => {
        onUpdated(await this.getMessages(conversationId));
      }
    );
  }

  static async updateConversationTimestamp(conversationId: string) {
    const updatedAt = Timestamp.fromDate(new Date());

    await setDoc(
      doc(firestore, 'conversation', conversationId),
      { updatedAt },
      { merge: true }
    );
  }

  static async getMessages(roomId: string) {
    const messagesQuery = query(
      collection(firestore, 'message'),
      where('conversationId', '==', roomId),
      orderBy('date', 'asc')
    );

    const messagesSnapshot = await getDocs(messagesQuery);

    const messages: Message[] = messagesSnapshot.docs.map((messageDoc) => {
      const { conversationId, userId, message, date } = messageDoc.data();
      return { conversationId, userId, message, date };
    });

    return messages;
  }

  static async createMessage({ conversationId, userId, message }: Message) {
    await addDoc(collection(firestore, 'message'), {
      conversationId,
      userId,
      message,
      date: Date.now(),
    });
    this.updateConversationTimestamp(conversationId);
  }
}