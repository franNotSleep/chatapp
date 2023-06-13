import { Container, Paper, Typography } from "@mui/material";

import { User } from "./Home.tsx";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate(); 
  const user: User | null = JSON.parse(localStorage.getItem("userInfo") || "null");

  if (!user) {
    navigate("/login/");
  }

  console.log(user);

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
