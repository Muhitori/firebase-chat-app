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
import { SignInUser, SignUpUser } from 'src/types/User';
import { UserService } from './User.service';

export const auth = getAuth();
const googleProvider = new GoogleAuthProvider();


const storage = getStorage();

export class AuthService {

  static async getCurrentUser() {
    if (auth.currentUser) {
      const { uid, email, displayName: name } = auth.currentUser;
      const avatar = await UserService.getAvatar(uid);
      return { uid, email, name, avatar };
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
