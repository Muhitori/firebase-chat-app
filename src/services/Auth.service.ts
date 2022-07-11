import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider, 
  signInWithPopup
} from 'firebase/auth';
import { AuthUser } from 'src/types/User';

export const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export class AuthService {
  static getCurrentUser() {
    return auth.currentUser;
  }

  static async signUp(user: AuthUser) {
    const { email, password } = user;
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user.getIdToken();
  }

  static async signIn(user: AuthUser) {
    const { email, password } = user;
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user.getIdToken();
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
