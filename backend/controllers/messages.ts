import { Response, Request, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler.js"; 
import Message from "../models/message.js";
import { RequestWithUser } from "../middleware/protect.js";
import { Types } from "mongoose";
import isValidObjectId from "../utils/isValidObjectId.js";
import CustomError from "../utils/errorResponse.js";


// @desc Get Messages 
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

// @desc Get Messages from particular 'To' user 
// @route GET /api/message/:toId
// @access Public
export const getMessageTo = asyncHandler(
  async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    let toId = req.params.toId;

    if(!isValidObjectId(toId)) {
      throw new CustomError(`Invalid ObjectId: '${toId}'`, 400);
    }

    let messages = await Message.find({ to: toId, from: req.user?._id });
    return res.status(200).json({ messages });
  }
)

// @desc Create Message
// @route POST /api/message/:toId
// @access Private 
export const createMessage = asyncHandler(
  async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    let toId = req.params.toId;

    if(!isValidObjectId(toId)) {
      throw new CustomError(`Invalid ObjectId: '${toId}'`, 400);
    }

    let newMessage = await Message.create({
      to: toId,
      from: req.user?._id,
      content: (req.body.content as string)
    });

    return res.status(200).json({ message: newMessage });
  }
)
