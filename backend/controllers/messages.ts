import { Response, Request, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler.js"; 
import Message from "../models/message.js";
import { RequestWithUser } from "../middleware/protect.js";
import { Types } from "mongoose";
import isValidObjectId from "../utils/isValidObjectId.js";
import CustomError from "../utils/errorResponse.js";
import Chat from "../models/chat.js";


// @desc Get User Messages 
// @route GET /api/message/
// @access Public
export const getMessage = asyncHandler(
  async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    let messages = await Message.find({ from: req.user?._id });
    res.status(200).json({messages});
  }
);

// @desc Get Messages from particular chat
// @route GET /api/message/:chatId
// @access Public
export const getMessageTo = asyncHandler(
  async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    let chatId = req.params.chatId;

    if(!isValidObjectId(chatId)) {
      throw new CustomError(`Invalid ObjectId: '${chatId}'`, 400);
    }

    const chat = await Chat.find({ _id: chatId });

    if (chat.length === 0) {
      throw new CustomError(`Resource Not Found: '${chatId}'`, 404);
    }

    let messages = await Message.find({ to: chatId });
    return res.status(200).json({ messages });
  }
)

// @desc Create Message
// @route POST /api/message/:chatId
// @access Private 
export const createMessage = asyncHandler(
  async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    let chatId = req.params.chatId;

    if(!isValidObjectId(chatId)) {
      throw new CustomError(`Invalid ObjectId: '${chatId}'`, 400);
    }

    const chat = await Chat.find({ _id: chatId });

    if (chat.length === 0) {
      throw new CustomError(`Resource Not Found: '${chatId}'`, 404);
    }

    let newMessage = await Message.create({
      to: chatId,
      from: req.user?._id,
      content: (req.body.content as string)
    });

    return res.status(200).json({ message: newMessage });
  }
)
