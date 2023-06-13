import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

import { Container } from "@mui/material";

function RootLayout() {
  return (
    <Container maxWidth="xl">
      <Navbar />
      <Outlet />
    </Container>
  );
}

export default RootLayout;
