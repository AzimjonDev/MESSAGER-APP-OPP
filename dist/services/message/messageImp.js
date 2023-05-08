"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageServiceImp = void 0;
class MessageServiceImp {
    constructor() {
        this.list = [];
        this.ID = 0;
    }
    getByUserIdAndReceiverId(userID, receiverID) {
        let messagesFromTo = [];
        for (let message of this.list) {
            if ((message.fromID === userID && message.toID === receiverID) || (message.toID === userID && message.fromID === receiverID)) {
                messagesFromTo = [...messagesFromTo, message];
            }
        }
        return messagesFromTo;
    }
    chats(userID) {
        const userChats = [];
        for (let message of this.list) {
            if (message.fromID == userID || message.toID == userID)
                userChats.push(message);
        }
        return userChats;
    }
    create(...data) {
        for (let message of data) {
            message.setId(++this.ID);
            this.list.push(message);
        }
    }
    getById(id) {
        for (let message of this.list) {
            if (message.getId() === id) {
                return message;
            }
        }
        throw new Error("Message not found");
    }
    updateById(update) { }
    deleteById(id) {
        for (let message of this.list) {
            if (message.getId() === id) {
                this.list.splice(this.list.indexOf(message), 1);
            }
        }
    }
}
exports.MessageServiceImp = MessageServiceImp;
