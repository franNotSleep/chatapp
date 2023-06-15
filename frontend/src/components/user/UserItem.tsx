import { User } from "../../contexts/userContext";
import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { useContext } from "react";
import { axiosService } from "../../helper/axios";
import { ChatContext, Chat } from "../../contexts/chatContext";

type UserItemProps = {
  user: User;
};

const UserItem = ({ user }: UserItemProps) => {
  const { setChat, setCurrentContact } = useContext(ChatContext);
  const handleClick = () => {
    // get chat
    axiosService
      .get(`/chat/${user._id}`)
      .then(({ data }: { data: Chat }) => {
        setChat(data);
        setCurrentContact(user);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <ListItem sx={{ cursor: "pointer" }} onClick={handleClick}>
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={user.username} secondary={user.email} />
    </ListItem>
  );
};

export default UserItem;
