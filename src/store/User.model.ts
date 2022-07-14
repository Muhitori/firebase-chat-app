import { Unsubscribe } from 'firebase/firestore';
import { action, makeAutoObservable, observable } from 'mobx';
import { UserService } from 'src/services/User.service';
import { IUser } from 'src/types/User';

export class UserModel {
  contacts: IUser[] = [];

  unsubscribeContacts: Unsubscribe | null = null;

  constructor() {
    makeAutoObservable(this, {
      contacts: observable,
      unsubscribeContacts: observable,
      setContacts: action,
    });
  }

  setContacts(users: IUser[]) {
    this.contacts = users;
  }

  setUnsubscribeContacts(unsubscribeContacts: Unsubscribe | null) {
    this.unsubscribeContacts = unsubscribeContacts;
  }

  async subscribeOnContacts(uid: string) {
    const unsubscribe = UserService.subscribeOnContacts(uid, (messages) =>
      this.setContacts(messages)
    );
    this.setUnsubscribeContacts(unsubscribe);
  }
}