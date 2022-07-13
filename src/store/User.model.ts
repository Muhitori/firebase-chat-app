import { action, makeAutoObservable, observable } from 'mobx';
import { UserService } from 'src/services/User.service';
import { IUser } from 'src/types/User';

export class UserModel {
  users: IUser[] = [];

  constructor() {
    makeAutoObservable(this, {
      users: observable,
      setUsers: action,
    });
  }

  setUsers(users: IUser[]) {
    this.users = users;
  }

  async getAllContacts(uid: string) {
    const users = await UserService.getAllContacts(uid);
    this.setUsers(users);
  }

  async getAvatar(userId: string) {
    const avatar = await UserService.getAvatar(userId);
    return avatar;
  }
}