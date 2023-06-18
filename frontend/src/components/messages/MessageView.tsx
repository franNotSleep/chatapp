import { Box } from "@mui/material";
import { useContext, useEffect } from "react";
import MessageHeader from "./MessageHeader";
import NoChatView from "./NoChatView";
import { axiosService } from "../../helper/axios";
import { ChatContext } from "../../contexts/chatContext";
import { socket } from "../../service/socket";
import MessageItem from "./MessageItem";
import MessageFooter from "./MessageFooter";

import React, { useState } from "react";
import typingAnimation from "../../assets/typing.json";
import Lottie from "lottie-react";

export interface Message {
  _id: string;
  content: string;
  from: string;
  to: string;
}

const MessageView = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { chat } = useContext(ChatContext);
  const [isTyping, setIsTyping] = useState(false);
  let chatId;

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
    chatId = chat?._id;
  }, [chat]);

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      {chat ? (
        <React.Fragment>
          <MessageHeader setMessages={setMessages} />
          <Box
            sx={{
              height: "300px",
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              background: "#E1ECC8",
            }}
          >
            {messages.map((message) => (
              <MessageItem message={message} key={message._id} />
            ))}
          </Box>
          {isTyping && (<Box
          sx={{
              width: "50px",
              height: "50px",
            }}>
            <Lottie 
              animationData={typingAnimation} 
              loop={true}
            />
          </Box>)}
          <MessageFooter messages={messages} setMessages={setMessages} />
        </React.Fragment>
      ) : (
        <NoChatView />
      )}
    </Box>
  );
};

export default MessageView;
