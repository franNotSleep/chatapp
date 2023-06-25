import { useContext, useEffect, useState } from "react";

import { Outlet, useLocation } from "react-router-dom";

import { Grid } from "@mui/material";
import Sidebar from "./components/Sidebar";
import { ChatContext } from "./contexts/chatContext";

function RootLayout() {
  const { chat } = useContext(ChatContext);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/profile/") {
      setShowProfile(true);
    } else {
      setShowProfile(false);
    }
  }, [location]);

  return (
    <Grid container sx={{ height: "100vh", width: "100%" }}>
      <Grid 
        item 
        xs={12}
        sm={5}
        md={4}
        sx={{
          display: { xs: chat || showProfile ? "none": "block", sm: "block"},
        }}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} sm={7} md={8} sx={{ display: { xs: chat || showProfile ? "block": "none", sm: "block"}}}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default RootLayout;
