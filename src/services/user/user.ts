import { User } from "../../models";
import { BaseService } from "../base";

export interface UserService extends BaseService<User>{
    list:any;
    setSMSCode(smsCode: number, phoneNumber: string): any
    signIn(phoneNumber: string, smsCode: number): User;
}