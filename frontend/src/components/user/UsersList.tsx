import { useState, useEffect, useContext } from "react";
import { isOnline, socket } from "../../service/socket";

import { Box, List } from "@mui/material";
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

  if (error) return "An error has ocurred.";
  if (isLoading) return "Loading...";

  return (
    <Box>
      <List
        sx={{
          bgcolor: "background.paper",
          border: "1px solid red",
        }}
      >
        {users.map((user) => (
          <UserItem
            user={user}
            online={isOnline(onlineUsers, user._id)}
            key={user._id}
          />
        ))}
      </List>
    </Box>
  );
};

export default UsersList;
