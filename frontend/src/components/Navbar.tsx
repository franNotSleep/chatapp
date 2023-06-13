import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { axiosService, fetcher } from '../helper/axios';
import { useNavigate } from 'react-router-dom';

import useSWR from "swr";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    axiosService
      .post("/users/logout")
      .then(_ => {
        navigate("/login/");
        localStorage.removeItem("userInfo");
      })
      .catch((e) => {
        console.log(e);
      })
  }

  const handleToProfile = () => {
    navigate("/profile/");
  }

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ChatApp
          </Typography>
          <Button color="inherit" onClick={handleToProfile}>Profile</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
    </Box>
  );
}
