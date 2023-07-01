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
import User from "../models/user.js";
import CustomError from "../utils/errorResponse.js";
import generateToken from "../utils/generateToken.js";
;
// @desc Auth user/set token
// @route POST /api/users/auth
// @access Public
const authUser = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    if (!email || !password) {
        throw new CustomError("Please provide an email and password", 400);
    }
    let user = yield User.findOne({ email }).select("+password");
    if (!user) {
        throw new CustomError("Invalid Credentials", 400);
    }
    let match = yield user.matchPassword(password);
    if (!match) {
        throw new CustomError("Invalid Credentials", 400);
    }
    sendUser(res, user);
}));
// @desc Register new user
// @route POST /api/users/
// @access Public
const registerUser = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, email, password } = req.body;
    const newUser = yield User.create({ username, email, password });
    sendUser(res, newUser);
}));
// @desc Get all users
// @route GET /api/users?search=
// @access Private 
const getUsers = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const query = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ]
        } : {};
    const users = yield User
        .find(query)
        .find({ _id: { $ne: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id } });
    res.status(200).json({ users });
}));
// @desc Logout user
// @route Post /api/users/logout
// @access Public
const logoutUser = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("token", null, {
        httpOnly: true,
        maxAge: -1,
    });
    res.status(200).json({ message: "Logged out" });
}));
// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ data: req.user });
}));
// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    let data = {
        email: req.body.email,
        username: req.body.username
    };
    const user = yield User.findByIdAndUpdate((_b = req.user) === null || _b === void 0 ? void 0 : _b._id, data, {
        new: true,
        runValidators: true
    });
    res.status(200).json({ user });
}));
const sendUser = (res, user) => {
    let data = {
        user: {
            email: user.email,
            username: user.username,
            _id: user._id,
            imageURL: user.imageURL
        },
    };
    generateToken(res, user._id.toString());
    res.status(200);
    res.json(data);
};
export { authUser, updateUserProfile, getUserProfile, registerUser, logoutUser, getUsers, };
//# sourceMappingURL=users.js.map