import { ListItem, ListItemText } from "@mui/material";
import { Message } from "../chat/Chat";
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
          background: fromSelf ? "#1B9AAA" : "#884A39",
          borderRadius: "10px",
          padding: 1,
        }}
      />
    </ListItem>
  );
};

export default MessageItem;
