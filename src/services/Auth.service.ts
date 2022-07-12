import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider, 
  signInWithPopup,
  getAuth,
  updateProfile
} from 'firebase/auth';
import { getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { SignInUser, SignUpUser } from 'src/types/User';
import { UserService } from './User.service';

export const auth = getAuth();
const googleProvider = new GoogleAuthProvider();


const storage = getStorage();
const firestore = getFirestore();

export class AuthService {

  static async getCurrentUser() {
    if (auth.currentUser) {
      const { uid } = auth.currentUser;
      const user = await UserService.getById(uid);
      return user;
    }
    return null;
  }

  static async signUp(user: SignUpUser) {
    const { email, password, name, avatar } = user;
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const userId = result.user.uid;

    if (name) {
      await  updateProfile(result.user, { displayName: name });
    }

    if (avatar) {
      const avatarURL = `avatar/${userId}`;
      await uploadBytes(storageRef(storage, avatarURL), avatar);
      
      await addDoc(collection(firestore, 'users'), {
        uid: userId,
        email,
        name,
        avatarURL
      });

      return;
    }

    await addDoc(collection(firestore, 'users'), {
      uid: userId,
      email,
      name 
    });
  }

  static async signIn(user: SignInUser) {
    const { email, password } = user;
    await signInWithEmailAndPassword(auth, email, password);
  }

  static async signInWithGoogle(successCallback: () => void) {
    const result = await signInWithPopup(auth, googleProvider);

    const { uid, email, displayName: name } = result.user;
    
    const isUserExist = await UserService.isExist(uid);

    if (!isUserExist) {
      await addDoc(collection(firestore, 'users'), {
        uid,
        email,
        name,
      });
    }

    successCallback();
  }

  static async signOut() {
    await signOut(auth);
  }
}
