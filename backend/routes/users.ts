import express from "express";

import { authUser, logoutUser, registerUser, getUsers, getUserProfile, updateUserProfile } from "../controllers/users.js";

import protect from "../middleware/protect.js";

const userRoute = express.Router();

userRoute.post("/auth", authUser);
userRoute.route("/").post(registerUser).get(protect, getUsers);
userRoute.post("/logout", logoutUser);
userRoute.route("/profile").put(protect, updateUserProfile).get(protect, getUserProfile);

export default userRoute;
