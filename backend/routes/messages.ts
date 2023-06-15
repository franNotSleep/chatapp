import { Router } from "express";

import { createMessage, getMessage, getMessageTo } from "../controllers/messages.js";
import protect from "../middleware/protect.js";

const messageRouter = Router();

messageRouter
  .get("/", protect ,getMessage);

messageRouter
  .route("/:chatId")
  .get(protect ,getMessageTo)
  .post(protect, createMessage);

export default messageRouter;
