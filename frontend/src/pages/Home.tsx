import { Box, Container, Stack } from "@mui/material";
import MessageView from "../components/messages/MessageView";
import UsersList from "../components/user/UsersList";
import { useState } from "react";

export type User = {
  username: string;
  email: string;
  _id: string;
};

export type ChatState = {
  chatId: string;
  chatWith: User;
}

function Home() {
  const [chat, setChat] = useState<ChatState>();
  console.log(chat);
  return (
    <Container>
        <UsersList setChat={setChat}/>
        <MessageView currentChat={chat?.chatId} chatWith={chat?.chatWith}/>
    </Container>
  );
}

export default Home;
