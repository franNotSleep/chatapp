import { Dispatch, SetStateAction, useContext } from "react";
import { Box, Typography, Stack, Avatar, Button, Paper, AppBar, Toolbar, CssBaseline, List, ListItemAvatar, ListItemText, IconButton, Tooltip } from "@mui/material";
import { ChatContext } from "../../contexts/chatContext";
import { Message } from "./Chat";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
type MessageHeaderProps = {
  setMessages: Dispatch<SetStateAction<Message[]>>;
};

const ChatHeader = ({ setMessages }: MessageHeaderProps) => {
  const { currentContact, setCurrentContact, setChat } =
    useContext(ChatContext);

  const onLeave = () => {
    setCurrentContact({
      _id: "",
      username: "",
      email: "",
      imageURL: "",
    });

    setChat(undefined);

    setMessages([]);
  };

  return (
    <Box>
      <AppBar position="static">
      <CssBaseline />
        <Toolbar>
          <List sx={{ flexGrow: 1, display: "flex" }}>
            <ListItemAvatar
              sx={{
                background: "#F9E0BB",
                borderRadius: "100%",
                mr: 2,
              }}>
              <Avatar 
                sx={{ 
                  width: 54,
                  height: 54,
                }} 
                src={currentContact.imageURL}/>
            </ListItemAvatar>
            <ListItemText 
              primary={currentContact.username} 
              secondary={currentContact.email}
            />
          </List>
          <Tooltip title="Leave chat">
            <IconButton color="info" onClick={onLeave}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ChatHeader;
