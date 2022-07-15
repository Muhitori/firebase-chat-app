import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider, 
  signInWithPopup,
  getAuth,
  updateProfile
} from 'firebase/auth';
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';
import {Timestamp} from 'firebase/firestore';
import { SignInUser, SignUpUser } from 'src/types/User';
import { UserService } from './User.service';

export const auth = getAuth();
const googleProvider = new GoogleAuthProvider();


const storage = getStorage();

export class AuthService {

  static getCurrentUserId() {
    return auth.currentUser?.uid;
  }

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

    const { uid } = result.user;
    const lastLoggedIn = Timestamp.fromDate(new Date());

    if (name) {
      await  updateProfile(result.user, { displayName: name });
    }

    if (avatar) {
      const avatarRef = storageRef(storage, `avatar/${uid}`);
      await uploadBytes(avatarRef, avatar);
      const avatarURL = await getDownloadURL(avatarRef);
      
      await UserService.createUser(uid, {
        uid,
        email,
        name,
        avatarURL,
        lastLoggedIn,
      });
      
      return;
    }

    await UserService.createUser(uid, {
      uid,
      email,
      name,
      lastLoggedIn,
    });
  }

  static async signIn(user: SignInUser) {
    const { email, password } = user;
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const { uid } = credential.user;

    const lastLoggedIn = Timestamp.fromDate(new Date());
    await UserService.updateUser(uid, { lastLoggedIn });
  }

  static async signInWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    const { uid, email, displayName: name } = result.user;

    const lastLoggedIn = Timestamp.fromDate(new Date());    
    const isUserExist = await UserService.isExist(uid);

    if (!isUserExist) {
      await UserService.createUser(uid, {
        uid,
        email,
        name,
        lastLoggedIn,
      });

      return;
    }

    await UserService.updateUser(uid, { lastLoggedIn });
  }

  static async signOut() {
    await signOut(auth);
  }
}
