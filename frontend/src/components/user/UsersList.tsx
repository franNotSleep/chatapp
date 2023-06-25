import useSWR from "swr";
import { useState, useEffect } from "react";
import { fetcher } from "../../helper/axios";
import { isOnline, socket } from "../../service/socket";

import { Box, List } from "@mui/material";
import { User } from "../../contexts/userContext";
import UserItem from "./UserItem";

type SWRResponse = {
  users: User[];
};

const UsersList = () => {
  const { error, data, isLoading } = useSWR<SWRResponse>("/users/", fetcher);

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
        {data?.users.map((user) => (
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
