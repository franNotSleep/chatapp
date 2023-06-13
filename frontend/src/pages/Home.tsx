import { Container } from "@mui/material";
import Navbar from "../components/Navbar";

export type User = {
  username: string;
  email: string;
  _id: string;
}

function Home() {
  return (
    <Container>
      <Navbar />
    </Container>
  
  )
}

export default Home;
