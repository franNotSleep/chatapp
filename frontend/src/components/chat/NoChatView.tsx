import Lottie from "lottie-react";
import { Box, Typography } from "@mui/material";

import chatLottie from "../../assets/chat.json";

import '@fontsource/roboto/700.css';

const NoChatView = () => {
  return (
    <Box sx={{
      border: "1px solid green",
      height: "100%"

    }}>
      <Box sx={{
        height: "200px",
        width: "200px",
        margin: "auto",
        marginY: "50px"
      }}>
        <Typography variant="h4" textAlign="center">ChatApplication</Typography>
        <Lottie animationData={chatLottie} loop={true} />
      </Box>
      <Box margin={"auto"} width={"300px"}>
        <Typography textAlign="center" my={3}>
          tell your partner how you are about 
          to fail the subject for chatting with 
          him instead of doing your homework.
        </Typography>
      </Box>
    </Box>
  );
}

export default NoChatView;
