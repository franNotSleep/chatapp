import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  createContext,
  useEffect,
} from "react";

import useSWR from "swr";

import { fetcher } from "../helper/axios";

export type User = {
  _id: string;
  username: string;
  email: string;
  imageURL: string;
};

export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  users: User[],
  setUsers: Dispatch<SetStateAction<User[]>>;
  error: any;
  isLoading: boolean;
}

const initialState = {
  user: {
    _id: "",
    email: "",
    username: "",
    imageURL: "",
  },
  setUser: () => {},
  setUsers: () => {},
  users: [],
  error: null,
  isLoading: false,
} as UserContextInterface;

export const UserContext = createContext(initialState);

export type UserProviderProps = {
  children: ReactNode;
};

type SWRResponse = {
  users: User[];
};

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState({
    _id: "",
    email: "",
    username: "",
    imageURL: ""
  });
  const [users, setUsers] = useState<User[]>([]);

  const { error, data, isLoading } = useSWR<SWRResponse>("/users/", fetcher, {
    refreshInterval: 20000,
  });

  useEffect(() => {
    if (data) setUsers(data.users);
  }, [data?.users])

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo) as User);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, users, setUsers, error, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
