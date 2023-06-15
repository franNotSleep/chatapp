import { User } from "../../contexts/userContext";
import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { Dispatch, SetStateAction } from "react";
import { axiosService } from "../../helper/axios";
import { ChatState } from "../../pages/Home";

type UserItemProps = {
  user: User,
  setChat: Dispatch<SetStateAction<ChatState>>
}

type Chat = {
  _id: string;
  users: string[];
  createdAt: Date;
  updatedAt: Date;
};

const UserItem = ({ user, setChat }: UserItemProps) => {
  const handleClick = () => {
    // get chat
    axiosService
      .get(`/chat/${user._id}`)
      .then(({ data }: { data: Chat }) => {
        console.log(data);
        setChat({chatId: data._id, chatWith: user})
      })
      .catch((e) => {
        console.log(e);
      })
  }
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
}

export default UserItem;
