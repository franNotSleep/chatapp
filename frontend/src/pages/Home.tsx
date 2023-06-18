import { Container, Grid } from "@mui/material";
import MessageView from "../components/messages/MessageView";
import UsersList from "../components/user/UsersList";
import ChatProvider, { Chat } from "../contexts/chatContext";
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
  const chats = useSWR<Chat[]>("/chat/", fetcher, {
    refreshInterval: 20000,
  });
  const { user } = useContext(UserContext);


  useEffect(() => {
    if (socket.disconnected) {
      socket.open()
      console.log(socket.connected);
    }
  }, [socket.connected])

  useEffect(() => {
    if (chats.data) {
      for (let chat of chats.data) {
        socket.emit("join-chat", chat._id);
      }
    }

    if (user._id) {
      socket.emit("setup", user);
    }

  }, [chats.data, user]);

  return (
    <ChatProvider>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
          sx={{
            marginY: "10px",
            border: "1px solid blue",
          }}
        >
          <Grid item xs={4}>
            <UsersList />
          </Grid>
          <Grid item xs={8}>
            <MessageView />
          </Grid>
        </Grid>
      </Container>
    </ChatProvider>
  );
}

export default Home;
