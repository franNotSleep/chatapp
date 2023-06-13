import { Request, Response, NextFunction} from "express";
import CustomError from "../utils/errorResponse.js";

import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.js";
import asyncHandler from "./asyncHandler.js";

interface JWTPayload {
    userId: string;
}

export interface RequestWithUser extends Request {
    user: IUser | null; 
}

const protect = asyncHandler(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
        let token = req.cookies.token as string;

        if (!token) {
            throw new CustomError("Unauthorized", 401);
        }

        try {
            const { userId } = jwt.verify(token, process.env.JWT_SECRET ?? "") as JWTPayload;
            req.user = await User.findById(userId);
            next();
        } catch(err) {
            throw new CustomError("Invalid token", 404);
        }
    }
);
export default protect;
