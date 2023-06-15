import { Box, Container, Divider, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MessageForm from "./MessageForm";
import { axiosService, fetcher } from "../../helper/axios";
import useSWR from "swr";
import { User, UserContext } from "../../contexts/userContext";

type MessageViewProps = {
  currentChat?: string;
  chatWith?: User;
}

interface Message {
  _id: string;
  content: string;
  from: string;
  to: string;
}

const MessageView = ({ currentChat, chatWith }: MessageViewProps) => {
  const [messages, setMessages] = useState<Message[]>();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (currentChat) {
      axiosService
        .get(`/message/${currentChat}`)
        .then((res) => {
          console.log(res.data);
          setMessages(res.data.messages);
        })
        .catch((e) => {
          console.log(e);
        })
    }
  }, [currentChat])

  return (
    <Box width={600} sx={{
      height: "100%",
    }}>
      <Box width={"100%"} sx={{
        background: "lightblue"
      }}>
          <Typography>{chatWith?.username}</Typography>
          <Divider />
      </Box>
      <Box width={"100%"} 
        sx={{ 
          height: "300px",
          border: "1px solid black"
        }}>
        {messages?.map(message => (
          <Box sx={{
            background: message.from === user._id ? "gray" : "white"
          }}>
            <Typography>{message.content}</Typography>
          </Box>
        ))}
      </Box>
      {currentChat && (
        <MessageForm currentChat={currentChat}/>
      )}
    </Box>
  );
}

export default MessageView;
