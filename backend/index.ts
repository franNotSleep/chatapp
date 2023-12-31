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
import { IUser } from "./models/user.js";
import path from "path";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === "production" ? "http://20.232.8.213:8000" : "http://localhost:5173",
  },
});
const port = process.env.PORT || 8000;

interface OnlineUsers {
  [socketId: string]: string;
}

const onlineUsers: OnlineUsers = {};

io.on("connection", (socket) => {
  socket.on("join-chat", (chatId: string) => {
    socket.join(chatId);
  });

  socket.emit("online-users", Object.values(onlineUsers));

  socket.on("setup", (user: IUser) => {
    console.log("Welcome " + user._id);
    onlineUsers[socket.id] = user._id.toString();

    socket.broadcast.emit("online-users", Object.values(onlineUsers));
  });

  socket.on("typing", (chatId: string) => {
    console.log("typing...");
    socket.to(chatId).emit("user-typing", chatId);
  });

  socket.on("stop", (chatId: string) => {
    console.log("stop...");
    socket.to(chatId).emit("stop-typing", chatId);
  });

  socket.on("message", (message: IMessage) => {
    let to = message.to.toString();
    socket.to(to).emit("message-response", message);
  });

  socket.on("offline", () => {
    console.log("Bye " + socket.id);
    delete onlineUsers[socket.id];
    socket.broadcast.emit("online-users", Object.values(onlineUsers));
    socket.disconnect(true);
  });

  socket.on("disconnect", () => {
    console.log("Bye " + socket.id);
    delete onlineUsers[socket.id];
    socket.broadcast.emit("online-users", Object.values(onlineUsers));
  });
});

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
  if (process.env.NODE_ENV == "development") {
    Message.deleteMany();
  }
});

app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/api/users/", userRoute);
app.use("/api/message/", messageRouter);
app.use("/api/chat/", chatRouter);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'frontend/dist')));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  })
}

// Error Middleware
app.use(errorHandler);
app.use(invalidPathHandler);

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
