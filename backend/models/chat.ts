import { Schema, Types, model } from "mongoose";

import { IUser } from "./user.js";

interface IChat {
  _id: Types.ObjectId;
  users: IUser[];
}

const chatSchema = new Schema<IChat>({
  users: [
    {
      type: Types.ObjectId,
      ref: "User",
    }
  ]
}, { timestamps: true });

const Chat = model("Chat", chatSchema);

export default Chat;
