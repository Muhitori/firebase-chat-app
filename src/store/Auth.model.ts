import { makeAutoObservable } from 'mobx';
import { AuthService } from 'src/services/Auth.service';
import { SignInUser, SignUpUser } from 'src/types/User';


export class AuthModel {
  constructor() {
    makeAutoObservable(this);
  }

  getCurrentUser() {
    return AuthService.getCurrentUser();
  }

  async signUp(user: SignUpUser) {
    await AuthService.signUp(user);
  }

  async signIn(user: SignInUser) {
    await AuthService.signIn(user);
  }

  async signInWithGoogle(successCallback: () => void) {
    await AuthService.signInWithGoogle(successCallback);
  }

  async signOut() {
    await AuthService.signOut();
  }
}