import { getStorage, getBytes, ref as storageRef } from 'firebase/storage';
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
  limit,
} from 'firebase/firestore';
import { Buffer } from 'buffer';
import { IUser } from 'src/types/User';

const storage = getStorage();

const firestore = getFirestore();

export class UserService {
  static async getAllContacts(currentUserId: string) {
    const usersQuery = query(collection(firestore, 'users'));
    const usersSnapshot = await getDocs(usersQuery);

    const users: IUser[] = await Promise.all(
      usersSnapshot.docs
        .filter((doc) => doc.data().uid !== currentUserId)
        .map(async (doc) => {
          const { uid, name, email, avatarURL } = doc.data();

          if (avatarURL) {
            const avatar = await this.getAvatar(avatarURL);
            return { uid, name, email, avatar };
          }

          return { uid, name, email };
        })
    );

    return users;
  }

  static async isExist(userId: string) {
    const usersQuery = query(
      collection(firestore, 'users'),
      where('uid', '==', userId),
      limit(1)
    );
    const usersSnapshot = await getDocs(usersQuery);

    return usersSnapshot.docs.length > 0;
  }

  static async getById(userId: string) {
    const usersQuery = query(
      collection(firestore, 'users'),
      where('uid', '==', userId),
      limit(1)
    );
    const usersSnapshot = await getDocs(usersQuery);
    const { uid, name, email, avatarURL } = usersSnapshot.docs[0].data();

    if (avatarURL) {
      const avatar = await this.getAvatar(avatarURL);
      return { uid, name, email, avatar };
    }

    return { uid, name, email };
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
}