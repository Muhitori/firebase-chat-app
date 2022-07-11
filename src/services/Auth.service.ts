import { getAuth, createUserWithEmailAndPassword, signOut,  GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { AuthUser } from 'src/types/User';

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export class AuthService {
  static async signUp(user: AuthUser) {
    const { email, password } = user;
    await createUserWithEmailAndPassword(auth, email, password);
  }

  static async signInWithGoogle(successCallback: () => void) {
    const result = await signInWithPopup(auth, googleProvider);
    successCallback();

    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential) {
      const token = credential.accessToken;
      const { user } = result;
      console.log(token, user);
    }
  }

  static async signOut() {
    await signOut(auth);
  }
}
