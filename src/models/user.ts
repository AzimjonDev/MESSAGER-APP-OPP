import { Base } from "./base";

export class User extends Base {
  constructor(public fullname: string, public smsCode: number, public phoneNumber: string, public username?: string) {
    super();
  }
}
