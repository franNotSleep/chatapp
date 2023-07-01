import { Schema, Types, model } from "mongoose";
const chatSchema = new Schema({
    users: [
        {
            type: Types.ObjectId,
            ref: "User",
        }
    ]
}, { timestamps: true });
const Chat = model("Chat", chatSchema);
export default Chat;
//# sourceMappingURL=chat.js.map