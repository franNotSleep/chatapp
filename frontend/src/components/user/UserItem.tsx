import { User } from "../../contexts/userContext";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Badge,
  Stack,
} from "@mui/material";
import { useContext } from "react";
import { axiosService } from "../../helper/axios";
import { ChatContext, Chat } from "../../contexts/chatContext";

import { useNavigate } from "react-router-dom";

type UserItemProps = {
  user: User;
  online: boolean;
};

const UserItem = ({ user, online }: UserItemProps) => {
  const { setChat, setCurrentContact, chat } = useContext(ChatContext);
  const navigate = useNavigate();

  const isSelectedChat = chat?.users.includes(user._id) ? true : false;

  const handleClick = () => {
    // get chat
    axiosService
      .get(`/chat/${user._id}`)
      .then(({ data }: { data: Chat }) => {
        setChat(data);
        setCurrentContact(user);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <ListItem
      sx={{
        cursor: "pointer",
        borderRadius: "10px",
        background: isSelectedChat ? "#FFC26F" : "" ,
        '&:hover': {
           background: "#E9E1C3",
        },
      }}
      onClick={handleClick}
    >
      <Stack direction={"row"} spacing={1}>
        <ListItemAvatar
          sx={{
            background: "#F9E0BB",
            borderRadius: "100%",
          }}
        >
          <Badge
            color={online ? "success" : "error"}
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent=" "
          >
            <Avatar sx={{ width: 56, height: 56 }} src={user.imageURL} />
          </Badge>
        </ListItemAvatar>
        <ListItemText primary={user.username} secondary={user.email} />
      </Stack>
    </ListItem>
  );
};

export default UserItem;
