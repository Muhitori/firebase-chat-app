import { action, makeAutoObservable, observable } from 'mobx';
import { snackbarGenerator } from 'src/components/common/SnackbarGenerator';
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

  async setCurrentUserAsync() {
    const user = await AuthService.getCurrentUser();
    this.setCurrentUser(user);
  }

  async signUp(user: SignUpUser) {
    try {
      await AuthService.signUp(user);
      this.setCurrentUserAsync();
      snackbarGenerator.success('Welcome!');
    } catch (error) {
      snackbarGenerator.error('Error!');
    }
  }

  async signIn(user: SignInUser) {
    try {
      await AuthService.signIn(user);
      this.setCurrentUserAsync();
      snackbarGenerator.success('Welcome!');
    } catch (error) {
      snackbarGenerator.error('Error!');
    }
  }

  async signInWithGoogle() {
    try {
      await AuthService.signInWithGoogle();
      this.setCurrentUserAsync();
      snackbarGenerator.success('Welcome!');
    } catch (error) {
      snackbarGenerator.error('Error!');
    }
  }

  async signOut(uid: string) {
    await AuthService.signOut(uid);
    this.setCurrentUser(null);
  }
}