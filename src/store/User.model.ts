import { makeAutoObservable } from 'mobx';
import { UserService } from 'src/services/User.service';

export class UserModel {
  constructor() {
    makeAutoObservable(this);
  }

  async getAvatar(userId: string) {
    
    const avatar = await UserService.getAvatar(userId);
    return avatar;
  }
}