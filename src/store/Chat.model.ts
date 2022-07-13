import { makeAutoObservable, observable, action } from 'mobx';
import { ChatService } from 'src/services/Chat.service';

export class ChatModel {
  companionId: string | null;

  constructor() {
    makeAutoObservable(this, {
      companionId: observable,
      setCompanionId: action,
    });

    // there was an undefined this, idk why
    this.companionId = null;
    this.setCompanionId = this.setCompanionId.bind(this);
    this.getConversation = this.getConversation.bind(this);
  }

  setCompanionId(uid: string | null) {
    this.companionId = uid;
  }

  async getConversation(uid: string) {
    await ChatService.getConversation(uid);
    this.setCompanionId(uid);
  }
}