import { User } from "../../models";
import { UserService } from "./user";

export class UserServiceImp implements UserService {
  private counterID = 0;

  list: User[] = [];

  create(...data: User[]) {
    for (let user of data) {
      user.setId(++this.counterID);
      this.list.push(user);
    }
  }

  getById(id: number) {
    for (let user of this.list) {
      if (user.getId() === id) {
        return user;
      }
    }

    throw new Error("User not found");
  }

  updateById(update: User, messageId: number) {}

  deleteById(id: number) {
    for (let user of this.list) {
      if (user.getId() === id) {
        this.list.splice(this.list.indexOf(user), 1);
      }
    }
  }

  setSMSCode(smsCode: number, phoneNumber: string) {
    for (let user of this.list) {
      if (user.phoneNumber === phoneNumber) {
        user.smsCode = smsCode;
        return;
      }
    }

    throw new Error("This phone number does not exist");
  }

  signIn(phoneNumber: string, smsCode: number): User {
    for (let user of this.list) {
      if (user.phoneNumber === phoneNumber && user.smsCode === smsCode) {
        return user;
      }
    }

    throw new Error("Password or PhoneNumber is wrong");
  }

  getUsersByIds(...ids: number[]) {
    let userList: User[] = [];

    for (let user of this.list) {
      if (ids.includes(user.getId())) {
        userList.push(user);
      }
    }

    if (userList.length) return userList;

    throw new Error("Users not found");
  }

  searchByName(partOfName: string) {
    let userList: User[] = [];
    for (let user of this.list) {
      if (user.fullname.toLowerCase().includes(partOfName.toLowerCase())) {
        userList.push(user);
      }
    }

    if (userList.length) return userList;
    throw new Error("User not found");
  }
}
