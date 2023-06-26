import io from "socket.io-client";

export const socket = io("http://localhost:8000", {
    autoConnect: false
});

export const isOnline = (onlineUsers: string[], userId: string) => {
    return (onlineUsers.indexOf(userId) === -1) ? false : true;
}
