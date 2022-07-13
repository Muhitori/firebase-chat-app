import { getStorage, getBytes, ref as storageRef } from 'firebase/storage';
import {
  getFirestore,
  collection,
  query,
  getDocs,
  doc,
  setDoc,
  getDoc,
  orderBy,
} from 'firebase/firestore';
import { Buffer } from 'buffer';
import { IUser } from 'src/types/User';

const storage = getStorage();

const firestore = getFirestore();

export class UserService {
  static async isExist(userId: string) {
    const userRef = await getDoc(doc(firestore, 'users', userId));

    return userRef.exists();
  }

  static async getAllContacts(currentUserId: string) {
    const usersQuery = query(
      collection(firestore, 'users'),
      orderBy('lastLoggedIn', 'desc')
    );
    const usersSnapshot = await getDocs(usersQuery);

    const users: IUser[] = await Promise.all(
      usersSnapshot.docs
        .filter((record) => record.data().uid !== currentUserId)
        .map(async (record) => {
          const { uid, name, email, avatarURL, lastLoggedIn } = record.data();

          if (avatarURL) {
            const avatar = await this.getAvatar(avatarURL);
            return { uid, name, email, avatar, lastLoggedIn };
          }

          return { uid, name, email, lastLoggedIn };
        })
    );

    return users;
  }

  static async getAvatar(avatarURL: string) {
    try {
      const avatar = await getBytes(storageRef(storage, avatarURL));
      const img = Buffer.from(avatar).toString('base64');
      return img;
    } catch (err) {
      return null;
    }
  }

  static async getById(userId: string) {
    const userRef = await getDoc(doc(firestore, 'users', userId));

    if (!userRef.exists()) return null;

    const { uid, name, email, avatarURL, lastLoggedIn } = userRef.data();

    if (avatarURL) {
      const avatar = await this.getAvatar(avatarURL);
      return { uid, name, email, avatar, lastLoggedIn };
    }

    return { uid, name, email, lastLoggedIn };
  }

  static async createUser(uid: string, fields: Partial<IUser>) {
    await setDoc(doc(firestore, 'users', uid), fields);
  }

  static async updateUser(uid: string, fields: Partial<IUser>) {
    await setDoc(doc(firestore, 'users', uid), fields, { merge: true });
  }
}