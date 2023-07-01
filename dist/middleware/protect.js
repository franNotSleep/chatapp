var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import CustomError from "../utils/errorResponse.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import asyncHandler from "./asyncHandler.js";
const protect = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let token = req.cookies.token;
    if (!token) {
        throw new CustomError("Unauthorized", 401);
    }
    try {
        const { userId } = jwt.verify(token, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "");
        req.user = yield User.findById(userId);
        next();
    }
    catch (err) {
        throw new CustomError("Invalid token", 404);
    }
}));
export default protect;
//# sourceMappingURL=protect.js.map