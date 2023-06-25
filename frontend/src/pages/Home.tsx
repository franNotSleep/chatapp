import Chat from "../components/chat/Chat";
import ChatProvider, { Chat as IChat } from "../contexts/chatContext";
import useSWR from "swr";

import { fetcher } from "../helper/axios";
import { useContext, useEffect } from "react";

import { socket } from "../service/socket";
import { UserContext } from "../contexts/userContext";

export type User = {
  username: string;
  email: string;
  _id: string;
};

export type ChatState = {
  chatId: string;
  chatWith: User;
};

function Home() {
  const chats = useSWR<IChat[]>("/chat/", fetcher, {
    refreshInterval: 20000,
  });
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (socket.disconnected) {
      socket.open();
      console.log(socket.connected);
    }
  });

  useEffect(() => {
    if (chats.data) {
      for (const chat of chats.data) {
        socket.emit("join-chat", chat._id);
      }
    }

    if (user._id) {
      socket.emit("setup", user);
    }
  }, [chats.data, user]);

  return <Chat />
  
}

export default Home;
