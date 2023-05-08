import { Base } from "./base";

export class Message extends Base {
  constructor(public fromID: number, public toID: number, public messageText: string) {
    super();
  }

}
