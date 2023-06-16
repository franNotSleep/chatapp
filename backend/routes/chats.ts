import { Router } from "express";
import { getChatOneToOne, getAllChat } from "../controllers/chat.js";
import protect from "../middleware/protect.js";

const chatRouter = Router();

chatRouter.get("/:userId", protect, getChatOneToOne);
chatRouter.get("/", protect, getAllChat);

export default chatRouter;
