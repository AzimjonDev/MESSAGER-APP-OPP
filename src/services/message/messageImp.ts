import { Message } from "../../models";
import { MessageService } from "./message";

export class MessageServiceImp implements MessageService {
  list: Message[] = [];
  private ID = 0;
  getByUserIdAndReceiverId(userID: number, receiverID: number) {
    let messagesFromTo: Message[] = [];

    for (let message of this.list) {
      if ((message.fromID === userID && message.toID === receiverID) || (message.toID === userID && message.fromID === receiverID)) {
        messagesFromTo = [...messagesFromTo, message];
      }
    }
    return messagesFromTo;

  }

  chats(userID: number) {
    const userChats: Message[] = [];

    for (let message of this.list) {
      if (message.fromID == userID || message.toID == userID) userChats.push(message);
    }

    return userChats;
  }

  create(...data: Message[]) {
    for (let message of data) {
      message.setId(++this.ID);
      this.list.push(message);
    }
  }

  getById(id: number) {
    for (let message of this.list) {
      if (message.getId() === id) {
        return message;
      }
    }

    throw new Error("Message not found");
  }

  updateById(update: Message) {}

  deleteById(id: number) {
    for (let message of this.list) {
      if (message.getId() === id) {
        this.list.splice(this.list.indexOf(message), 1);
      }
    }
  }
}
