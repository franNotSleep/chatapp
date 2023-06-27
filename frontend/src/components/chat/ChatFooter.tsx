import { Dispatch, SetStateAction } from "react";
import MessageForm from "../messages/MessageForm";
import { Message } from "./Chat";
import { Box } from "@mui/material";

type MessageFooterProps = {
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>
}

const ChatFooter = ({ messages, setMessages }: MessageFooterProps) => {
  return (
    <Box
      sx={{
        background: "#884A39",
        padding: "10px",
      }}
    >
      <MessageForm
        messages={messages}
        setMessages={setMessages}
      />
    </Box>
  ); 
}

export default ChatFooter;
