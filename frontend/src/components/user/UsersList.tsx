import { useState, useEffect, useContext } from "react";
import { socket } from "../../service/socket";

import { List, Divider } from "@mui/material";
import UserItem from "./UserItem";
import { fetcher } from "../../helper/axios";

import { User, UserContext } from "../../contexts/userContext";

import Loading from "../feedback/Loading";
import useSWR from "swr";

interface OnlineUsers {
  [userId: string]: string;
}

type SWRResponse = {
  users: User[];
};

const UsersList = () => {
  const { error, data, isLoading } = useSWR<SWRResponse>("/users/", fetcher, {
    refreshInterval: 20000,
  });

  const [onlineUsers, setOnlineUsers] = useState<OnlineUsers>({});
  const { setUsers, users } = useContext(UserContext);

  useEffect(() => {
    if (data?.users) {
      setUsers(data.users);
    }
  }, [data?.users])

  useEffect(() => {
    socket.on("online-users", (users: OnlineUsers) => {
      setOnlineUsers(users);
    });
    return () => {
      socket.off("online-users");
    };
  }, []);

  if (isLoading) return <Loading color="info"/>;
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
