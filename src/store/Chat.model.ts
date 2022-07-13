import { Unsubscribe } from 'firebase/firestore';
import { makeAutoObservable, observable, action } from 'mobx';
import { ChatService } from 'src/services/Chat.service';
import { UserService } from 'src/services/User.service';
import { Message } from 'src/types/Chat';

export class ChatModel {
  companionId: string | null;

  conversationId: string | null;

  messages: Message[] | null;

  companionAvatar: string | null;

  unsubscribe: Unsubscribe | null;


  constructor() {
    makeAutoObservable(this, {
      companionId: observable,
      conversationId: observable,
      messages: observable,
      companionAvatar: observable,
      unsubscribe: observable,
      setCompanionId: action,
      setConversationId: action,
      setCompanionAvatar: action,
    });

    this.companionId = null;
    this.conversationId = null;
    this.messages = null;
    this.companionAvatar = null;
    this.unsubscribe = null;

    // there was an undefined this, idk why
    this.setCompanionId = this.setCompanionId.bind(this);
    this.setConversationId = this.setConversationId.bind(this);
    this.getConversation = this.getConversation.bind(this);
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

  setCompanionAvatar(avatar: string | null) {
    this.companionAvatar = avatar;
  }

  setUnsubscribe(unsubscribe: Unsubscribe | null) {
    this.unsubscribe = unsubscribe;
  }

  async getConversation(uid: string) {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.setUnsubscribe(null);
    }

    const conversation = await ChatService.getConversation(uid);

    if (!conversation) return;

    await ChatService.updateConversationTimestamp(conversation.id);
    const unsubscribe = ChatService.subscribeOn(conversation.id, (messages) => {
      this.setMessages(messages)
    });

    this.setUnsubscribe(unsubscribe);
    this.setConversationId(conversation.id);

    const companion = await UserService.getById(uid);
    this.setCompanionId(uid);

    if (companion?.avatar) {
      this.setCompanionAvatar(companion.avatar);
    } else {
      this.setCompanionAvatar(null);
    }
  }

  async getMessages(conversationId: string) {
    const messages = await ChatService.getMessages(conversationId);
    this.setMessages(messages);
  }

  async createMessage(message: Message) {
    await ChatService.createMessage(message);
  }
}