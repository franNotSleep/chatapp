import { Dispatch, useState, SetStateAction, useContext } from "react";

import {
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import { axiosService } from "../../helper/axios";
import { Message } from "./MessageView";
import { ChatContext } from "../../contexts/chatContext";
import { socket } from "../../service/socket";

type MessageFormProps = {
  currentChat: string;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
};

const MessageForm = ({ currentChat, setMessages, messages }: MessageFormProps) => {
  const [content, setContent] = useState("");
  const { chat } = useContext(ChatContext);

  const handleClick = () => {
    const data = {
      to: currentChat,
      content,
    };
    axiosService
      .post(`/message/${currentChat}`, data)
      .then(({ data }: { data: {message: Message} }) => {
        // Show message
        setContent("");
        setMessages([...messages, data.message])

        // Emit message
        socket.emit("message", data.message);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: "100%",
      }}
    >
      <OutlinedInput
        fullWidth
        sx={{ borderRadius: "30px" }}
        placeholder="Message"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClick}>
              <SendIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </Box>
  );
};

export default MessageForm;
