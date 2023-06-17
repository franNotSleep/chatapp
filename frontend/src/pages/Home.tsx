import { Container } from "@mui/material";
import MessageView from "../components/messages/MessageView";
import UsersList from "../components/user/UsersList";
import ChatProvider, { Chat } from "../contexts/chatContext";
import useSWR from "swr";

import { fetcher } from "../helper/axios";
import { useEffect } from "react";

import { socket } from "../service/socket";

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
  const chats = useSWR<Chat[]>("/chat/", fetcher, {
    refreshInterval: 20000,
  });

  useEffect(() => {
    if (chats.data) {
      for (let chat of chats.data) {
        socket.emit("join-chat", chat._id);
      }
    }
  }, [chats.data]);

  return (
    <ChatProvider>
      <Container maxWidth="md">
        <UsersList />
        <MessageView />
      </Container>
    </ChatProvider>
  );
}

export default Home;
