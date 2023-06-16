import express, { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import userRoute from "./routes/users.js";
import errorHandler, { invalidPathHandler } from "./middleware/errorHandler.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

import cors from "cors";
import ExpressMongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import messageRouter from "./routes/messages.js";
import chatRouter from "./routes/chats.js";
import Message, { IMessage } from "./models/message.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
const port = process.env.PORT || 8000;

io.on("connection", (socket) => {
  socket.on("join-chat", (chatId: string) => {
    socket.join(chatId);
  });

  socket.on("message", (message: IMessage) => {
    let to = message.to.toString();
    socket.to(to).emit("message-response", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected.");
  });
});

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Sanitize data
app.use(ExpressMongoSanitize());

// Set security header
app.use(helmet());

if (process.env.NODE_ENV == "development") {
  app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(
      `${req.method} ${req.protocol}://${req.hostname}:${port}${req.url}`
    );
    next();
  });
}

// Connect DB
connectDB().then(() => {
  Message.deleteMany().exec();
});

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/users/", userRoute);
app.use("/api/message/", messageRouter);
app.use("/api/chat/", chatRouter);

// Error Middleware
app.use(errorHandler);
app.use(invalidPathHandler);

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
