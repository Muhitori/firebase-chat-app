import { makeAutoObservable } from 'mobx';
import { User } from 'src/types/User';

export class AuthStoreModel {

  private user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }
}
