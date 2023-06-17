import { Dispatch, SetStateAction, useState, createContext } from "react";

import { User, UserProviderProps } from "./userContext";

export type Chat = {
  _id: string;
  users: string[];
  createdAt: string;
  updatedAt: string;
};

export interface ChatContextInterface {
  chat: Chat | undefined;
  setChat: Dispatch<SetStateAction<Chat | undefined>>;
  setCurrentContact: Dispatch<SetStateAction<User>>;
  currentContact: User;
}

const initialState = {
  chat: {
    _id: "",
    users: [],
    createdAt: "",
    updatedAt: "",
  },
  setChat: (_chat: Chat) => {},
  setCurrentContact: (_user: User) => {},
  currentContact: {
    _id: "",
    username: "",
    email: "",
    imageURL: ""
  },
} as ChatContextInterface;

export const ChatContext = createContext(initialState);

function ChatProvider({ children }: UserProviderProps) {
  const [currentContact, setCurrentContact] = useState({
    _id: "",
    email: "",
    username: "",
    imageURL: ""
  });

  const [chat, setChat] = useState<Chat>();

  return (
    <ChatContext.Provider
      value={{ currentContact, setCurrentContact, chat, setChat }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatProvider;
