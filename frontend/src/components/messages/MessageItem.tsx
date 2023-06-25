import { Typography, Box, ListItem, ListItemText } from "@mui/material";
import { Message } from "../chat/ChatView";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { format } from "timeago.js";

type MessageItemProps = {
  message: Message;
};

const MessageItem = ({ message }: MessageItemProps) => {
  const { user } = useContext(UserContext);
  const fromSelf = message.from === user._id;

  return (
    <ListItem
      sx={{
        width: "max-content",
        alignSelf: fromSelf ? "flex-end" : "flex-start",
      }}
    >
      <ListItemText 
        primary={message.content}
        secondary={format(message.createdAt)}
        sx={{
          background: fromSelf ? "#A675A1" : "#CEA2AC",
          borderRadius: "10px",
          padding: 1,
        }}
      />
    </ListItem>
  );
};

export default MessageItem;
