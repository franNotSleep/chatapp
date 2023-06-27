import { Box, Typography, Card, CardContent, Avatar, Stack } from "@mui/material";
import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";

const UserCard = () => {
  const { user } = useContext(UserContext);

  return (
    <Card sx={{ width: 275, margin: "auto", background: "#F9E0BB" }}>
      <CardContent>
        <Stack direction={"row"}>

          <Avatar sx={{ width: 90, height: 90 }} src={user?.imageURL}/>

          <Box>
            <Typography sx={{ fontSize: 34, m: 0 }} color="text.secondary" gutterBottom>
              {user?.username}
            </Typography>

            <Typography sx={{ fontSize: 14, m: 0 }} color="text.secondary" gutterBottom>
              {user?.email}
            </Typography>
          </Box>

        </Stack>
      </CardContent>
    </Card>
  );
}

export default UserCard;
