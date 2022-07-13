import { AuthModel } from './Auth.model';
import { ChatModel } from './Chat.model';
import { UserModel } from './User.model';

export class RootStoreModel {
  auth: AuthModel;
  
  user: UserModel;

  chat: ChatModel;

  constructor() {
    this.auth = new AuthModel();
    this.user = new UserModel();
    this.chat = new ChatModel();
  }
}