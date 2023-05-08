"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServiceImp = void 0;
class UserServiceImp {
    constructor() {
        this.counterID = 0;
        this.list = [];
    }
    create(...data) {
        for (let user of data) {
            user.setId(++this.counterID);
            this.list.push(user);
        }
    }
    getById(id) {
        for (let user of this.list) {
            if (user.getId() === id) {
                return user;
            }
        }
        throw new Error("User not found");
    }
    updateById(update, messageId) { }
    deleteById(id) {
        for (let user of this.list) {
            if (user.getId() === id) {
                this.list.splice(this.list.indexOf(user), 1);
            }
        }
    }
    setSMSCode(smsCode, phoneNumber) {
        for (let user of this.list) {
            if (user.phoneNumber === phoneNumber) {
                user.smsCode = smsCode;
                return;
            }
        }
        throw new Error("This phone number does not exist");
    }
    signIn(phoneNumber, smsCode) {
        for (let user of this.list) {
            if (user.phoneNumber === phoneNumber && user.smsCode === smsCode) {
                return user;
            }
        }
        throw new Error("Password or PhoneNumber is wrong");
    }
    getUsersByIds(...ids) {
        let userList = [];
        for (let user of this.list) {
            if (ids.includes(user.getId())) {
                userList.push(user);
            }
        }
        if (userList.length)
            return userList;
        throw new Error("Users not found");
    }
    searchByName(partOfName) {
        let userList = [];
        for (let user of this.list) {
            if (user.fullname.toLowerCase().includes(partOfName.toLowerCase())) {
                userList.push(user);
            }
        }
        if (userList.length)
            return userList;
        throw new Error("User not found");
    }
}
exports.UserServiceImp = UserServiceImp;
