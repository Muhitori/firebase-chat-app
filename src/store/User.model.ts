import { makeAutoObservable } from 'mobx';
import { UserService } from 'src/services/User.service';

export class UserModel {
  constructor() {
    makeAutoObservable(this);
  }

  async getAllUsers() {
    const users = await UserService.getAll();
    return users;
  }

  async getAvatar(userId: string) {
    const avatar = await UserService.getAvatar(userId);
    return avatar;
  }
}