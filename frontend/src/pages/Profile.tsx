import {  Tooltip, Container, IconButton, Paper, Typography } from "@mui/material";

import UserCard from "../components/user/UserCard.tsx";
import { useEffect, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [quote, setQuote] = useState({
    author: "",
    text: ""
  });
  const navigate = useNavigate();
  const options = {
    method: 'GET',
    url: 'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote',
    params: {
      token: 'ipworld.info'
    },
    headers: {
      'X-RapidAPI-Key': 'cd3a82bd69msh13c8197d7bb0d09p172bd4jsnf7b769fca256',
      'X-RapidAPI-Host': 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com'
    }
  };

  useEffect(() => {
    axios
      .request(options)
      .then(res => {
        setQuote(res.data);
      })
      .catch(e => {
        console.log(e);
      })
  }, [])

  return (
    <Container maxWidth="xs">
      <Tooltip title="Go Back">
        <IconButton onClick={() => { navigate("/") }}>
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>
      <Typography variant="h3">Profile</Typography>
      <UserCard />
      <Typography variant="h5">Motivational Quotes</Typography>
      <Paper sx={{
        padding: "3px",
        marginTop: "5px",
      }}>
        <Typography textAlign={"center"} variant="body2">"{quote.text}"</Typography>
        <Typography textAlign={"center"} variant="caption">-{quote.author}</Typography>
      </Paper>
    </Container>
  );
}

export default Profile;
