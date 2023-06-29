import { useEffect, useRef } from "react";

import typingAnimation from "../../assets/typing.json";
import Lottie from "lottie-react";

import { List, ListItem } from "@mui/material";

import MessageItem from "./MessageItem";
import { Message } from "../chat/Chat";

type MessagesProps = {
  messages: Message[],
  typing: boolean
}

const Messages = ({ messages, typing }: MessagesProps ) => {
  const targetRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typing]);

return (
    <List 
      sx={{ 
        width: "100%", 
        flex: "1 1 auto", 
        display: "flex",
        flexDirection: "column",
        rowGap: 1,
        height: "300px",
        overflow: "auto",
        background: "#F9E0BB",
      }}>

      {messages.map((message) => (
        <MessageItem message={message} key={message._id} />
      ))}
      {typing && (
        <ListItem sx={{ width: "100px", height: "100px", alignSelf: "flex-start" }}>
          <Lottie animationData={typingAnimation} loop={true} />
        </ListItem>
      )}
      <div ref={targetRef}/>
    </List>
  );
};

export default Messages;
