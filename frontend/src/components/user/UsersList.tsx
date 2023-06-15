import useSWR from "swr";
import { fetcher } from "../../helper/axios";
import { Dispatch, SetStateAction } from "react";

import { Box, Container, List } from "@mui/material";
import { User } from "../../contexts/userContext";
import UserItem from "./UserItem";
import { ChatState } from "../../pages/Home";

type SWRResponse = {
  users: User[]
}

export type UsersListProps = {
  setChat: Dispatch<SetStateAction<ChatState>>;
}

const UsersList = ({ setChat }: UsersListProps) => {
  const { error, data, isLoading } = useSWR<SWRResponse>("/users/", fetcher);

  if (error) return "An error has ocurred.";
  if (isLoading) return "Loading...";

  return (
    <Box width={"300px"}>
      <List sx={{ width: '100%',height: "97%", maxWidth: 360, bgcolor: 'background.paper', border: "1px solid lightblue" }}>
        {data?.users.map(user => (
          <UserItem user={user} setChat={setChat} key={user._id}/>
        ))}
      </List>
    </Box>
  )
}

export default UsersList;
