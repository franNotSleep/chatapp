import mongoose, { Types, Schema } from "mongoose";

export interface IMessage {
  _id: Types.ObjectId,
  content: string;
  to: Types.ObjectId,
  from: Types.ObjectId
}

const messageScheme = new Schema<IMessage>({
  content: {
    type: String,
    trim: true,
    required: [true, "Please provide a content"],
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
    required: true
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

const Message = mongoose.model<IMessage>("Message", messageScheme);

export default Message;
