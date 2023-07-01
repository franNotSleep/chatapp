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
import { Types } from "mongoose";
import Chat from "../models/chat.js";
// @desc Get Chat One to One
// @route GET /api/chat/:userId
// @access Private 
export const getChatOneToOne = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const currentUserId = new Types.ObjectId((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    const paramUserId = new Types.ObjectId(req.params.userId);
    let chat = yield Chat.find({
        users: {
            $all: [
                { $elemMatch: { $eq: currentUserId } },
                { $elemMatch: { $eq: paramUserId } },
            ]
        }
    });
    if (chat.length === 0) {
        // Create new chat
        const newChat = yield Chat.create({
            users: [(_b = req.user) === null || _b === void 0 ? void 0 : _b._id, req.params.userId]
        });
        return res.status(200).json(newChat);
    }
    return res.status(200).json(chat[0]);
}));
// @desc Get All Chat
// @route GET /api/chat/
// @access Private 
export const getAllChat = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const currentUserId = new Types.ObjectId((_c = req.user) === null || _c === void 0 ? void 0 : _c._id);
    let chats = yield Chat.find({
        users: {
            $elemMatch: { $eq: currentUserId },
        }
    });
    return res.status(200).json(chats);
}));
//# sourceMappingURL=chat.js.map