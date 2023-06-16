import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import MessageForm from "./MessageForm";
import MessageHeader from "./MessageHeader";
import { axiosService } from "../../helper/axios";
import { UserContext } from "../../contexts/userContext";
import { ChatContext } from "../../contexts/chatContext";
import { socket } from "../../service/socket";

export interface Message {
  _id: string;
  content: string;
  from: string;
  to: string;
}

const MessageView = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useContext(UserContext);
  const { chat } = useContext(ChatContext);
  let chatId;

  useEffect(() => {
    socket.on("message-response", (newMessage: Message) => {
      if (chat?._id === newMessage.to) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        // notification
      }
    });

    return () => {
      socket.off("message-response"); // Clean up the event listener on unmount
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
      width={600}
      sx={{
        height: "100%",
      }}
    >
      <MessageHeader />
      <Box
        width={"100%"}
        sx={{
          height: "300px",
          border: "1px solid black",
        }}
      >
        {messages.map((message) => (
          <Box
            sx={{
              background: message.from === user._id ? "gray" : "white",
            }}
            key={message._id}
          >
            <Typography>{message.content}</Typography>
          </Box>
        ))}
      </Box>
      {chat && (
        <MessageForm
          messages={messages}
          setMessages={setMessages}
          currentChat={chat._id}
        />
      )}
    </Box>
  );
};

export default MessageView;
