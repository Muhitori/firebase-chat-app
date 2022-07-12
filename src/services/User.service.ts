import { getStorage, getBytes, ref as storageRef } from 'firebase/storage';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
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
          const { uid, name, email } = doc.data();
          const avatar = await this.getAvatar(uid);
          return { uid, name, email, avatar };
        })
    );

    return users;
  }

  static async getAvatar(userId: string) {
    try {
      const avatar = await getBytes(storageRef(storage, `avatar/${userId}`));
      const img = Buffer.from(avatar).toString('base64');
      return img;
    } catch (err) {
      return null;
    }
  }
}