import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/userContext";

import {
  Box,
  FilledInput,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import { axiosService } from "../../helper/axios";

type MessageFormProps = {
  currentChat: string;
};

const MessageForm = ({ currentChat }: MessageFormProps) => {
  const [content, setContent] = useState("");
  const { user } = useContext(UserContext);

  const handleClick = () => {
    const data = {
      to: currentChat,
      content,
    };
    axiosService
      .post(`/message/${currentChat}`, data)
      .then((res) => {
        setContent("");
        console.log(res.data);
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
