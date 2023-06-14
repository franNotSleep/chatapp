import { Container, Paper, Typography } from "@mui/material";

import { useContext } from "react";
import { UserContext } from "../contexts/userContext.tsx";

function Profile() {
  const { user } = useContext(UserContext);

  return (
    <Container>
      <Paper>
        <Typography>Id: {user?._id}</Typography>
        <Typography>{user?.username}</Typography>
        <Typography>{user?.email}</Typography>
      </Paper>
    </Container>
  );
}

export default Profile;
