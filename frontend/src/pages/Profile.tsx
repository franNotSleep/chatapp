import {  Tooltip, Box, IconButton, Typography, Card, CardContent } from "@mui/material";

import UserCard from "../components/user/UserCard.tsx";
import { useEffect, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { options } from "../service/rapidapi.js";

function Profile() {
  const [quote, setQuote] = useState({
    author: "",
    text: ""
  });
  const navigate = useNavigate();

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
    <Box sx={{ background: "#884A39", height: "100%"}}>
      <Tooltip title="Go Back">
        <IconButton onClick={() => { navigate("/") }} color="info" sx={{ mb: 3 }}>
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>
      <UserCard />
    <Card sx={{ width: 275, margin: "auto", mt: 2, background: "#F9E0BB" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          Motivational Quote
        </Typography>
        <Typography sx={{ mb: 1, ml: 2, fontSize: 14 }} color="text.secondary">
          "{quote.text}"
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
          -{quote.author} 
        </Typography>
        </CardContent>
    </Card>
    </Box>
  );
}

export default Profile;
