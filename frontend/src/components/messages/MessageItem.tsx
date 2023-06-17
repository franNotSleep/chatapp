import { Typography, Box } from "@mui/material";
import { Message } from "./MessageView";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

type MessageItemProps = {
  message: Message;
};

const MessageItem = ({ message }: MessageItemProps) => {
  const { user } = useContext(UserContext);
  const fromSelf = message.from === user._id;
  return (
    <Box
      sx={{
        width: "max-content",
        borderRadius: "20px",
        alignSelf: fromSelf ? "flex-end" : "flex-start",
      }}
    >
      <Typography
        padding={1}
        color={"#FFF"}
        sx={{
          background: fromSelf ? "#A675A1" : "#CEA2AC",
          borderRadius: "20px",
        }}
      >
        {message.content}
      </Typography>
    </Box>
  );
};

export default MessageItem;
