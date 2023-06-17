import React, { Dispatch, SetStateAction } from "react";
import MessageForm from "./MessageForm";
import { Message } from "./MessageView";
import { Box } from "@mui/material";

type MessageFooterProps = {
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>
}

const MessageFooter = ({ messages, setMessages }: MessageFooterProps) => {
  return (
    <Box
      sx={{
        background: "#E3F4F4",
        padding: "10px",
        borderRadius: "20px"
      }}
    >
      <MessageForm
        messages={messages}
        setMessages={setMessages}
      />
    </Box>
  ); 
}

export default MessageFooter;
