import { Message, User } from "./models";
import { MessageServiceImp } from "./services/message/messageImp";
import { UserServiceImp } from "./services/user/userImp";

const UserService = new UserServiceImp();
const MessageService = new MessageServiceImp();

const hafizulloh = new User("Hafizulloh Abdusattorov", 123, "+998944328240", "hafizboy");
const samandar = new User("Samandar Rahmonov", 7777, "+998993343494", "samandar");
const davronali = new User("Davronali ", 332, "+998993343495");
const azimjonaka = new User("Azimjon aka ", 5555, "+998993343496");
const murodilla = new User("Murdulla ", 437, "+998993343497");
const murodil = new User("Murodil ", 666, "+998993343498");
const ayub = new User("ayyub ", 4444, "+998971085000", "aytishnikman");

UserService.create(hafizulloh, samandar, davronali, azimjonaka, murodilla, murodil, ayub);

const messagebyHafizulloh = new Message(hafizulloh.getId(), samandar.getId(), "CS:GO davay");
const messagebySamandar = new Message(samandar.getId(), hafizulloh.getId(), "Darsingni qil");
const messagebyDavronali = new Message(davronali.getId(), hafizulloh.getId(), "suv ichib kelib uxlang");
const messagebyHafizulloh2 = new Message(hafizulloh.getId(), davronali.getId(), "yoooooq");
const messagebyDavronali2 = new Message(davronali.getId(), azimjonaka.getId(), "Sizgayam hoddog olib keldik");
const messagebyAzimjonaka = new Message(azimjonaka.getId(), davronali.getId(), "Eee joniz sog' bosiin!!");
const messagebyAyyuub = new Message(ayub.getId(), hafizulloh.getId(), "Qaytishizda Hoddog olib keling bizga ham");
const messagebyHafizulloh3 = new Message(hafizulloh.getId(), ayub.getId(), "Birga chiqib kelamiz");
const messagebyAyyuub2 = new Message(ayub.getId(), hafizulloh.getId(), "Shunaqa deyishizni bilgandik...");

MessageService.create(messagebyHafizulloh, messagebySamandar, messagebyDavronali, messagebyHafizulloh2, messagebyDavronali2, messagebyAzimjonaka, messagebyAyyuub, messagebyHafizulloh3, messagebyAyyuub2);

function getMessagesOnePerson(userID: number) {
  const messages = MessageService.chats(userID);
  const chats = [];
  for (let message of messages) {
    let msg = `${UserService.getById(message.fromID).fullname} --> ${message.messageText} -->> ${UserService.getById(message.toID).fullname}`;
    chats.push(msg);
  }
  return chats;
}

function chatbySenderToReciver(senderID: number, receiverID: number) {
  const msgs = MessageService.getByUserIdAndReceiverId(senderID, receiverID);
  const chats = [];
  for (let i = 0; i < msgs.length; i++) {
    let senderName = UserService.getById(msgs[i].fromID).fullname;
    let receiverName = UserService.getById(msgs[i].toID).fullname;
    let message = msgs[i].messageText;

    chats.push(`${senderName} --> ${message} --> ${receiverName}`);
  }
  if(chats.length) return chats;
  else return "No messages";
}

const davronaliChats = getMessagesOnePerson(davronali.getId());
// console.log(davronaliChats);

const davronaliANDazimjonaka = chatbySenderToReciver(davronali.getId(), azimjonaka.getId());
// console.log(davronaliANDazimjonaka);

// let oldMe = UserService.signIn("+998971085000", 4444); // pasword changes
// console.log(oldMe);

// UserService.setSMSCode(4342, "+998971085000");

// let me = UserService.signIn("+998971085000", 4342); // pasword changes
// console.log(me);

function signInAndSendMessage(number: string, password: number, messageTO: string, newMessage: string) {
  let user = UserService.signIn(number, password);
  let reciverUser = UserService.searchByName(messageTO);

  const userMessage = new Message(user.getId(), reciverUser[0].getId(), newMessage);
  MessageService.create(userMessage);
}

// accauntga kirib kimga sms jonatishni aytamiz
// signInAndSendMessage("+998971085000", 4444, 'ali', 'Salom qalaysiz')

// console.log(getMessagesOnePerson(ayub.getId()))
// console.log(getMessagesOnePerson(davronali.getId()))

// console.log(chatbySenderToReciver(azimjonaka.getId(), hafizulloh.getId()))
// console.log();

function changePassword(phoneNumber: string, password: number, newPassword: number){
  let user = UserService.signIn(phoneNumber, password);
  
  if(user){
    user.smsCode = newPassword
  }
  else{
    throw new Error("Phoneor Password is wrong")
  }
  
  return user
}

console.log(changePassword("+998993343496", 5555, 2101))

























