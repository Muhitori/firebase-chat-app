import { makeAutoObservable, observable, action } from 'mobx';
import { ChatService } from 'src/services/Chat.service';
import { Message } from 'src/types/Chat';

export class ChatModel {
  companionId: string | null;

  conversationId: string | null;

  constructor() {
    makeAutoObservable(this, {
      companionId: observable,
      conversationId: observable,
      setCompanionId: action,
    });

    this.companionId = null;
    this.conversationId = null;

    // there was an undefined this, idk why
    this.setCompanionId = this.setCompanionId.bind(this);
    this.setConversationId = this.setConversationId.bind(this);
    this.getConversation = this.getConversation.bind(this);
  }

  setCompanionId(uid: string | null) {
    this.companionId = uid;
  }

  setConversationId(conversationId: string | null) {
    this.conversationId = conversationId;
  }

  async getConversation(uid: string) {
    const conversation = await ChatService.getConversation(uid);
    this.setCompanionId(uid);

    if (conversation) {
      this.setConversationId(conversation.id);
    }
  }

  async createMessage(message: Message) {
    await ChatService.createMessage(message);
  }
}