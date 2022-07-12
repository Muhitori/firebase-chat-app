import { AuthModel } from './Auth.model';
import { UserModel } from './User.model';

export class RootStoreModel {
  auth: AuthModel;
  
  user: UserModel;

  constructor() {
    this.auth = new AuthModel();
    this.user = new UserModel();
  }
}