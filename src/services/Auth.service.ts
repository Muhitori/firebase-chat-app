import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider, 
  signInWithPopup
} from 'firebase/auth';
import { getDatabase, ref as databaseRef, set } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';
import { SignInUser, SignUpUser } from 'src/types/User';

export const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

const database = getDatabase();

const storage = getStorage();

export class AuthService {
  static getCurrentUser() {
    return auth.currentUser;
  }

  static async signUp(user: SignUpUser) {
    const { email, password, name, avatar } = user;
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const userId = result.user.uid;

    if (name) {
      set(databaseRef(database, `users/${userId}`), { name });
    }

    if (avatar) {
      const imageRef = storageRef(storage, `avatar/${userId}`);
      await uploadBytes(imageRef, avatar);
    }
  }

  static async signIn(user: SignInUser) {
    const { email, password } = user;
    await signInWithEmailAndPassword(auth, email, password);
  }

  static async signInWithGoogle(successCallback: () => void) {
    const result = await signInWithPopup(auth, googleProvider);
    successCallback();

    
    const credential = GoogleAuthProvider.credentialFromResult(result);
    return credential?.accessToken;
  }

  static async signOut() {
    await signOut(auth);
  }
}
