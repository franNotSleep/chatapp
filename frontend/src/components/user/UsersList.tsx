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
    <Box height={"100%"}>
      <List
        sx={{
          bgcolor: "background.paper",
          border: "1px solid red",
          height: "430px",
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
