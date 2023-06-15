import { Container } from "@mui/material";
import MessageView from "../components/messages/MessageView";
import UsersList from "../components/user/UsersList";
import ChatProvider from "../contexts/chatContext";

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
  return (
    <ChatProvider>
      <Container>
          <UsersList />
          <MessageView />
      </Container>
    </ChatProvider>
  );
}

export default Home;
