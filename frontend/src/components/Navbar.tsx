import { Menu, MenuItem, Typography, Toolbar, Box, AppBar, CssBaseline, Avatar, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { axiosService } from "../helper/axios";
import { useNavigate } from "react-router-dom";
import { socket } from "../service/socket";
import { UserContext } from "../contexts/userContext";

import MenuIcon from "@mui/icons-material/Menu";
import SearchUsers from "./user/SearchUsers";

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useContext(UserContext);

  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    axiosService
      .post("/users/logout")
      .then(() => {
        navigate("/login/");
        handleClose();
        localStorage.removeItem("userInfo");
        socket.emit("offline");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleToProfile = () => {
    navigate("/profile/");
    handleClose();
  };

  console.log(user);

  return (
    <Box>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between"}}>
          <Typography
            variant="h6"
            component="div"
          >
            <Avatar 
              src={user.imageURL}
              sx={{ width: 54, height: 54, cursor: "pointer" }}
              onClick={handleToProfile}
            />
          </Typography>
          <SearchUsers />
          <IconButton onClick={handleClick}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleToProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}
