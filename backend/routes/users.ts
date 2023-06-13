import express from "express";

import { authUser, logoutUser, registerUser } from "../controllers/users.js";
import { getUserProfile } from "../controllers/users.js";
import { updateUserProfile } from "../controllers/users.js";

import protect from "../middleware/protect.js";

const userRoute = express.Router();

userRoute.post("/auth", authUser);
userRoute.post("/", registerUser);
userRoute.post("/logout", logoutUser);
userRoute.route("/profile").put(protect, updateUserProfile).get(protect, getUserProfile);

export default userRoute;
