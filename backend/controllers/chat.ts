import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { RequestWithUser } from "../middleware/protect.js";
import { Types } from "mongoose";
import Chat from "../models/chat.js";

// @desc Get Chat One to One
// @route GET /api/chat/:userId
// @access Private 
export const getChatOneToOne = asyncHandler(
  async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const currentUserId = new Types.ObjectId(req.user?._id);
    const paramUserId = new Types.ObjectId(req.params.userId);

    let chat = await Chat.find({
      users: {
        $all: [
          { $elemMatch: { $eq: currentUserId } },
          { $elemMatch: { $eq: paramUserId } },
        ] 
      }
    });

    if (chat.length === 0) {
      // Create new chat
      const newChat = await Chat.create({
        users: [req.user?._id, req.params.userId]
      })
      return res.status(200).json(newChat);
    }

    return res.status(200).json(chat[0]);
  }
);

// @desc Get All Chat
// @route GET /api/chat/
// @access Private 
export const getAllChat = asyncHandler(
  async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const currentUserId = new Types.ObjectId(req.user?._id);

    let chats = await Chat.find({
      users: {
         $elemMatch: { $eq: currentUserId } ,
      }
    });

    return res.status(200).json(chats);
  }
)
