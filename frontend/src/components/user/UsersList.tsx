import useSWR from "swr";
import { fetcher } from "../../helper/axios";

import { Box, List } from "@mui/material";
import { User } from "../../contexts/userContext";
import UserItem from "./UserItem";

type SWRResponse = {
  users: User[];
};

const UsersList = () => {
  const { error, data, isLoading } = useSWR<SWRResponse>("/users/", fetcher);
  if (error) return "An error has ocurred.";
  if (isLoading) return "Loading...";

  return (
    <Box width={"300px"}>
      <List
        sx={{
          width: "100%",
          height: "97%",
          maxWidth: 360,
          bgcolor: "background.paper",
          border: "1px solid lightblue",
        }}
      >
        {data?.users.map((user) => (
          <UserItem user={user} key={user._id} />
        ))}
      </List>
    </Box>
  );
};

export default UsersList;
