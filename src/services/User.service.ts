import {
  getFirestore,
  collection,
  query,
  getDocs,
  doc,
  setDoc,
  getDoc,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { IUser } from 'src/types/User';

const firestore = getFirestore();

export class UserService {
  static async isExist(userId: string) {
    const userRef = await getDoc(doc(firestore, 'users', userId));
    return userRef.exists();
  }

  static subscribeOnContacts(
    currentUserId: string,
    onUpdated: (messages: IUser[]) => void
  ) {
    return onSnapshot(collection(firestore, 'users'), async () => {
      onUpdated(await this.getAllContacts(currentUserId));
    });
  }

  static async getAllContacts(currentUserId: string) {
    const usersQuery = query(
      collection(firestore, 'users'),
      orderBy('lastLoggedIn', 'desc')
    );
    const usersSnapshot = await getDocs(usersQuery);

    const users: IUser[] = await Promise.all(
      usersSnapshot.docs
        .filter(
          (record) =>
            record.data().uid !== currentUserId &&
            record.data().uid !== undefined
        )
        .map(async (record) => {
          const { uid, name, email, avatarURL, lastLoggedIn } = record.data();
          return { uid, name, email, avatarURL, lastLoggedIn };
        })
    );

    return users;
  }

  static async getById(userId: string) {
    const userRef = await getDoc(doc(firestore, 'users', userId));

    if (!userRef.exists()) return null;

    const { uid, name, email, avatarURL, lastLoggedIn } = userRef.data();

    return { uid, name, email, avatarURL, lastLoggedIn };
  }

  static async createUser(uid: string, fields: Partial<IUser>) {
    await setDoc(doc(firestore, 'users', uid), fields);
  }

  static async updateUser(uid: string, fields: Partial<IUser>) {
    await setDoc(doc(firestore, 'users', uid), fields, { merge: true });
  }
}