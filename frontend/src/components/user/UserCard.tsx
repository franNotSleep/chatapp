import { Paper, Typography, Stack, Divider, Box } from "@mui/material";
import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";

const UserCard = () => {
  const { user } = useContext(UserContext)

  return (
    <Paper>
      <Stack 
        direction={{xs:"column", sm: "row"}}
        spacing={2}
        marginY={3}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Box sx={{
          padding: "5px"
        }}>
          <Typography variant="subtitle1">Username: </Typography>
          <Typography variant="subtitle2">{user?.username}</Typography>
        </Box>
        <Box sx={{
          padding: "5px"
        }}>
          <Typography variant="subtitle1">Email: </Typography>
          <Typography variant="subtitle2">{user?.email}</Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

export default UserCard;
