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
} from 'firebase/firestore';
import { Message } from 'src/types/Chat';
import { AuthService } from './Auth.service';

const firestore = getFirestore();

export class ChatService {
  static async getConversation(uid: string) {
    const myId = AuthService.getCurrentUserId();

    if (!myId) return null;

    const userRef1 = await getDoc(doc(firestore, 'conversation', myId + uid));
    const userRef2 = await getDoc(doc(firestore, 'conversation', uid + myId));

    if (userRef1.exists()) {
      return userRef1.data();
    }

    if (userRef2.exists()) {
      return userRef2.data();
    }

    await this.createConversation(myId, uid);
    const conversationRef = await getDoc(
      doc(firestore, 'conversation', myId + uid)
    );

    return conversationRef.data();
  }

  static async isConversationExist(user1Id: string, user2Id: string) {
    const userRef1 = await getDoc(
      doc(firestore, 'conversation', user1Id + user2Id)
    );
    const userRef2 = await getDoc(
      doc(firestore, 'conversation', user2Id + user1Id)
    );

    return userRef1.exists() || userRef2.exists();
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

  static async createMessage({ conversationId, userId, message }: Message) {
    await addDoc(collection(firestore, 'message'), {
      conversationId,
      userId,
      message,
      date: new Date(),
    });
  }
}