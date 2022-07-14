import { action, makeAutoObservable, observable } from 'mobx';
import { UserService } from 'src/services/User.service';
import { IUser } from 'src/types/User';

export class UserModel {
  contacts: IUser[] = [];

  constructor() {
    makeAutoObservable(this, {
      contacts: observable,
      setContacts: action,
    });
  }

  setContacts(users: IUser[]) {
    this.contacts = users;
  }

  async getAllContacts(uid: string) {
    const users = await UserService.getAllContacts(uid);
    this.setContacts(users);
  }
}