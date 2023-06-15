import { useContext } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { ChatContext } from "../../contexts/chatContext";

const MessageHeader = () => {
  const { currentContact } = useContext(ChatContext);

  return (
    <Box
      width={"100%"}
      sx={{
        background: "lightblue",
      }}
    >
      <Typography>{currentContact?.username}</Typography>
      <Divider />
    </Box>
  );
};

export default MessageHeader;
