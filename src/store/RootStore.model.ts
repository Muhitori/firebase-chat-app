import { AuthStoreModel } from './AuthStore.model';

export class RootStoreModel {
  authStore: AuthStoreModel;

  constructor() {
    this.authStore = new AuthStoreModel();
  }
}