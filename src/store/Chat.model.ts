import { makeAutoObservable, observable, action } from 'mobx';
import { ChatService } from 'src/services/Chat.service';
import { Message } from 'src/types/Chat';

export class ChatModel {
  companionId: string | null;

  conversationId: string | null;

  messages: Message[] | null;

  constructor() {
    makeAutoObservable(this, {
      companionId: observable,
      conversationId: observable,
      messages: observable,
      setCompanionId: action,
      setConversationId: action,
    });

    this.companionId = null;
    this.conversationId = null;
    this.messages = null;

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

  setMessages(messages: Message[] | null) {
    this.messages = messages;
  }

  async getConversation(uid: string) {
    const conversation = await ChatService.getConversation(uid);
    this.setCompanionId(uid);

    if (!conversation) return;

    this.setConversationId(conversation.id);
    await this.getMessages(conversation.id);
  }

  async getMessages(conversationId: string) {
    const messages = await ChatService.getMessages(conversationId);
    this.setMessages(messages);
  }

  async createMessage(message: Message) {
    await ChatService.createMessage(message);
  }
}