import { makeAutoObservable } from 'mobx';
import { AuthService } from 'src/services/Auth.service';
import { AuthUser } from 'src/types/User';

export class AuthStoreModel {
  constructor() {
    makeAutoObservable(this);
  }

  async signUp(user: AuthUser) {
    await AuthService.signUp(user);
  }

  async signInWithGoogle(successCallback: () => void) {
    await AuthService.signInWithGoogle(successCallback);
  }

  async signOut() {
    await AuthService.signOut();
  }
}
