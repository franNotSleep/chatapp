import { Dispatch, SetStateAction, useContext } from "react";
import { Box, Typography, Stack, Avatar, Button } from "@mui/material";
import { ChatContext } from "../../contexts/chatContext";
import { Message } from "./MessageView";

type MessageHeaderProps = {
  setMessages: Dispatch<SetStateAction<Message[]>>;
};

const MessageHeader = ({ setMessages }: MessageHeaderProps) => {
  const { currentContact, setCurrentContact, setChat } =
    useContext(ChatContext);

  const onLeave = () => {
    setCurrentContact({
      _id: "",
      username: "",
      email: "",
      imageURL: "",
    });

    setChat(undefined);

    setMessages([]);
  };

  return (
    <Box
      width={"100%"}
      sx={{
        background: "lightblue",
        borderRadius: "10px",
      }}
    >
      <Stack direction={"row"} sx={{ padding: 1 }}>
        <Avatar sx={{ width: 56, height: 56 }} src={currentContact?.imageURL} />
        <Box flexGrow={1}>
          <Typography variant="body1">{currentContact?.username}</Typography>
          <Typography variant="subtitle2">{currentContact?.email}</Typography>
        </Box>
        <Button variant="contained" color="error" onClick={onLeave}>
          Leave Chat
        </Button>
      </Stack>
    </Box>
  );
};

export default MessageHeader;
