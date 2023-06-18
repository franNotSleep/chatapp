import io from "socket.io-client";
import { User } from "../contexts/userContext";

export const socket = io("http://localhost:8000", {
    autoConnect: false
});

export const isOnline = (onlineUsers: string[], userId: string) => {
    console.log(onlineUsers);
    return (onlineUsers.indexOf(userId) === -1) ? false : true;
}
