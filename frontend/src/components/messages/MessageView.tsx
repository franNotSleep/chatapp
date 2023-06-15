import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import MessageForm from "./MessageForm";
import MessageHeader from "./MessageHeader";
import { axiosService } from "../../helper/axios";
import { UserContext } from "../../contexts/userContext";
import { ChatContext } from "../../contexts/chatContext";

interface Message {
  _id: string;
  content: string;
  from: string;
  to: string;
}

const MessageView = () => {
  const [messages, setMessages] = useState<Message[]>();
  const { user } = useContext(UserContext);
  const { chat } = useContext(ChatContext);

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
        {messages?.map((message) => (
          <Box
            sx={{
              background: message.from === user._id ? "gray" : "white",
            }}
          >
            <Typography>{message.content}</Typography>
          </Box>
        ))}
      </Box>
      {chat && <MessageForm currentChat={chat._id} />}
    </Box>
  );
};

export default MessageView;
