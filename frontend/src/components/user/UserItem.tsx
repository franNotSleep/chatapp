import { User } from "../../contexts/userContext";
import { ListItem, ListItemAvatar, Avatar, ListItemText, Badge, Divider, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { axiosService } from "../../helper/axios";
import { ChatContext, Chat } from "../../contexts/chatContext";
import { socket } from "../../service/socket";

type UserItemProps = {
  user: User;
  online: boolean;
};

const UserItem = ({ user, online }: UserItemProps) => {
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

  console.log(`Is online: ${online}\nId: ${user._id}`);

  return (
    <ListItem sx={{ cursor: "pointer", background: "#CBD4C2", mb: 2, borderRadius: "20px" }} onClick={handleClick}>
      <Stack direction={"row"} spacing={1}>
        <ListItemAvatar sx={{
          background: "#C9F9FF",
          borderRadius: "100%"
        }}>
          <Badge 
            color={online ? "success" : "error"}
            overlap="circular"
            anchorOrigin={{ 
              vertical: 'bottom',
              horizontal: 'right',
            }}
            badgeContent=" ">
            <Avatar 
              sx={{ width: 56, height: 56 }}
              src={user.imageURL}/>
          </Badge>
        </ListItemAvatar>
        <Divider orientation="vertical"/>
        <ListItemText primary={user.username} secondary={user.email} />
      </Stack>
    </ListItem>
  );
};

export default UserItem;
