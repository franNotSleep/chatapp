import { Button, Typography, Toolbar, Box, AppBar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { axiosService } from "../helper/axios";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    axiosService
      .post("/users/logout")
      .then((_) => {
        navigate("/login/");
        localStorage.removeItem("userInfo");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleToProfile = () => {
    navigate("/profile/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            onClick={() => navigate("/")}
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            ChatApp
          </Typography>
          <Button color="inherit" onClick={handleToProfile}>
            Profile
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
    </Box>
  );
}