import { Router } from "express";
import { getChatOneToOne } from "../controllers/chat.js";
import protect from "../middleware/protect.js";

const chatRouter = Router();

chatRouter.get("/:userId", protect, getChatOneToOne);

export default chatRouter;
