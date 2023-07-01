import mongoose, { Schema } from "mongoose";
const messageScheme = new Schema({
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
const Message = mongoose.model("Message", messageScheme);
export default Message;
//# sourceMappingURL=message.js.map