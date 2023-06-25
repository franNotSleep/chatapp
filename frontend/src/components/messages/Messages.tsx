import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";

import { Box, List } from "@mui/material";

import MessageItem from "./MessageItem";
import { Message } from "./MessageView";

type MessagesProps = {
  messages: Message[],
}

const Messages = ({ messages }: MessagesProps ) => {
  const targetRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

return (
    <List 
      sx={{ 
        background: "green", 
        width: "100%", 
        flex: "1 1 auto", 
        display: "flex",
        flexDirection: "column",
        rowGap: 1,
        height: "300px",
        overflow: "auto"
      }}>
      {messages.map((message) => (
        <MessageItem message={message} key={message._id} />
      ))}
      <div ref={targetRef}/>
    </List>
  );
};

export default Messages;
