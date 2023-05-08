import { Message } from "../../models";
import { BaseService } from "../base";


export interface MessageService extends BaseService<Message>{
     list: any;
     getByUserIdAndReceiverId(userID: number, receiverID: number):any;
}