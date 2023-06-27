import { Box } from "@mui/material";
import { useContext, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import NoChatView from "./NoChatView";
import { axiosService } from "../../helper/axios";
import { ChatContext } from "../../contexts/chatContext";
import { socket } from "../../service/socket";
import Messages from "../messages/Messages";
import ChatFooter from "./ChatFooter";

import React, { useState } from "react";

export interface Message {
  _id: string;
  content: string;
  from: string;
  to: string;
  createdAt: Date;
  updatedAt: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { chat } = useContext(ChatContext);
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    socket.on("message-response", (newMessage: Message) => {
      if (chat?._id === newMessage.to) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        // notification
      }
    });

    socket.on("user-typing", (chatId) => {
      if (chatId === chat?._id) setIsTyping(true);
    });

    socket.on("stop-typing", (msg: string) => {
      console.log(msg);
      setIsTyping(false);
    });

    return () => {
      socket.off("message-response");
      socket.off("user-typing");
      socket.off("stop-typing");
    };
  }, [chat]);

  useEffect(() => {
    if (chat) {
      axiosService
        .get(`/message/${chat?._id}`)
        .then((res) => {
          setMessages(res.data.messages);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [chat]);


  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexFlow: "column",
      }}
    >
      {chat ? (
        <React.Fragment>
          <ChatHeader setMessages={setMessages} />
          <Messages messages={messages} typing={isTyping}/>
          <ChatFooter messages={messages} setMessages={setMessages} />
        </React.Fragment>
      ) : (
        <NoChatView />
      )}
    </Box>
  );
};

export default Chat;
