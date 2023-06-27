import { useState, useEffect, useContext } from "react";
import { isOnline, socket } from "../../service/socket";

import { List, Divider } from "@mui/material";
import { UserContext } from "../../contexts/userContext";
import UserItem from "./UserItem";

const UsersList = () => {
  const { users, error, isLoading } = useContext(UserContext);

  const [onlineUsers, setOnlineUsers] = useState<Array<string>>([]);

  useEffect(() => {
    socket.on("online-users", (users: Array<string>) => {
      setOnlineUsers(users);
    });
    return () => {
      socket.off("online-users");
    };
  }, []);

  console.log(error);
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
              online={isOnline(onlineUsers, user._id)}
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
