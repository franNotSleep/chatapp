var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import asyncHandler from "../middleware/asyncHandler.js";
import Message from "../models/message.js";
import isValidObjectId from "../utils/isValidObjectId.js";
import CustomError from "../utils/errorResponse.js";
import Chat from "../models/chat.js";
// @desc Get User Messages 
// @route GET /api/message/
// @access Public
export const getMessage = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let messages = yield Message.find({ from: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
    res.status(200).json({ messages });
}));
// @desc Get Messages from particular chat
// @route GET /api/message/:chatId
// @access Public
export const getMessageTo = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let chatId = req.params.chatId;
    if (!isValidObjectId(chatId)) {
        throw new CustomError(`Invalid ObjectId: '${chatId}'`, 400);
    }
    const chat = yield Chat.find({ _id: chatId });
    if (chat.length === 0) {
        throw new CustomError(`Resource Not Found: '${chatId}'`, 404);
    }
    let messages = yield Message.find({ to: chatId });
    return res.status(200).json({ messages });
}));
// @desc Create Message
// @route POST /api/message/:chatId
// @access Private 
export const createMessage = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    let chatId = req.params.chatId;
    if (!isValidObjectId(chatId)) {
        throw new CustomError(`Invalid ObjectId: '${chatId}'`, 400);
    }
    const chat = yield Chat.find({ _id: chatId });
    if (chat.length === 0) {
        throw new CustomError(`Resource Not Found: '${chatId}'`, 404);
    }
    let newMessage = yield Message.create({
        to: chatId,
        from: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
        content: req.body.content
    });
    return res.status(200).json({ message: newMessage });
}));
//# sourceMappingURL=messages.js.map