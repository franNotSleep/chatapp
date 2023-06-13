import { Box, Container, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <Container>
      <Box marginX={"auto"}>
        <Typography>404</Typography>
        <Typography>Resource Not Found</Typography>
        <NavLink to={"/"}>
          <Typography>Go Back Home</Typography>
        </NavLink>
      </Box>
    </Container>
  );
};

export default NotFound;
