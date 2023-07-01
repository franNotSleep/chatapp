import { useState, useEffect, useContext } from "react";
import { socket } from "../../service/socket";

import { List, Divider } from "@mui/material";
import { UserContext } from "../../contexts/userContext";
import UserItem from "./UserItem";

interface OnlineUsers {
  [userId: string]: string;
}

const UsersList = () => {
  const { users, error, isLoading } = useContext(UserContext);

  const [onlineUsers, setOnlineUsers] = useState<OnlineUsers>({});

  useEffect(() => {
    socket.on("online-users", (users: OnlineUsers) => {
      setOnlineUsers(users);
    });
    return () => {
      socket.off("online-users");
    };
  }, []);

  if (isLoading) return "Loading...";
  if (error) return "An error has ocurred.";

  return (
      <List
        sx={{
          height: "100%",
          overflow: "auto",
          padding: 2,
        }}
      >
        {users.map((user) => (
          <>
            <UserItem
              user={user}
              online={Boolean(onlineUsers[user._id])}
              key={user._id}
            />

          <Divider 
            variant="inset" 
            component="li" 
            sx={{ color: "#000" }} />
         </>
        ))}
      </List>
  );
};

export default UsersList;
