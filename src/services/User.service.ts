import { getStorage, getBytes, ref as storageRef } from 'firebase/storage';
import { Buffer } from 'buffer';

const storage = getStorage();

export class UserService {

  static async getAvatar(userId: string) {
    const avatar = await getBytes(storageRef(storage, `avatar/${userId}`));
    const img = Buffer.from(avatar).toString('base64');
    return img;
  }
}