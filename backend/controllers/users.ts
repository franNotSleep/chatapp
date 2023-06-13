import { Response, Request, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler.js";

import User, { IUser } from "../models/user.js";
import CustomError from "../utils/errorResponse.js";

import generateToken from "../utils/generateToken.js";
import { RequestWithUser } from "../middleware/protect.js";

interface LoginBodyRequest {
  email: string;
  password: string;
}

interface RegisterBodyRequest extends LoginBodyRequest {
  username: string;
}

interface UpdateProfileBodyRequest extends RequestWithUser {
  body: {
    username: string | undefined;
    email: string | undefined;
  }
};

interface CustomRequestBody<T extends LoginBodyRequest> {
  body: T;
}

// @desc Auth user/set token
// @route POST /api/users/auth
// @access Public
const authUser = asyncHandler(
  async (
    req: CustomRequestBody<LoginBodyRequest>,
    res: Response,
    next: NextFunction
  ) => {
    let { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError("Please provide an email and password", 400);
    }

    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new CustomError("Invalid Credentials", 400);
    }

    let match = await user.matchPassword(password);

    if (!match) {
      throw new CustomError("Invalid Credentials", 400);
    }
    sendUser(res, user);
  }
);

// @desc Register new user
// @route POST /api/users/
// @access Public
const registerUser = asyncHandler(
  async (
    req: CustomRequestBody<RegisterBodyRequest>,
    res: Response,
    next: NextFunction
  ) => {
    let { username, email, password } = req.body;

    const newUser = await User.create({ username, email, password });

    sendUser(res, newUser);
  }
);

// @desc Logout user
// @route Post /api/users/logout
// @access Public
const logoutUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", null, {
      httpOnly: true,
      maxAge: -1,
    });

    res.status(200).json({ message: "Logged out" });
  }
);

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    res.status(200).json({ data: req.user });
  }
);

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(
  async (req: UpdateProfileBodyRequest, res: Response, next: NextFunction) => {
    let data = {
      email: req.body.email,
      username: req.body.username
    };

    const user = await User.findByIdAndUpdate(req.user?._id, data, {
      new: true,
      runValidators: true
    });


    res.status(200).json({ user });
  }
);

const sendUser = (res: Response, user: IUser) => {
  let data = {
    user: {
      email: user.email,
      username: user.username,
      _id: user._id,
    },
  };

  generateToken(res, user._id.toString());
  res.status(200);
  res.json(data);
};

export {
  authUser,
  updateUserProfile,
  getUserProfile,
  registerUser,
  logoutUser,
};
