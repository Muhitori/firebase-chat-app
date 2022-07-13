import { action, makeAutoObservable, observable } from 'mobx';
import { AuthService } from 'src/services/Auth.service';
import { IUser, SignInUser, SignUpUser } from 'src/types/User';


export class AuthModel {
  currentUser: IUser | null = null;

  constructor() {
    makeAutoObservable(this, {
      currentUser: observable,
      setCurrentUser: action
    });
  }

  setCurrentUser(user: IUser | null) {
    this.currentUser = user;
  }

  getCurrentUserId() {
    return AuthService.getCurrentUserId();
  }

  async setCurrentUserAsync() {
    const user = await AuthService.getCurrentUser();
    this.setCurrentUser(user);
  }

  async signUp(user: SignUpUser) {
    await AuthService.signUp(user);
    this.setCurrentUserAsync();
  }

  async signIn(user: SignInUser) {
    await AuthService.signIn(user);
    this.setCurrentUserAsync();
  }

  async signInWithGoogle() {
    await AuthService.signInWithGoogle();
    this.setCurrentUserAsync();
  }

  async signOut() {
    await AuthService.signOut();
    this.setCurrentUser(null);
  }
}