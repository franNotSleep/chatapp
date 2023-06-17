import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  createContext,
  useEffect,
} from "react";

export type User = {
  _id: string;
  username: string;
  email: string;
  imageURL: string;
};

export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const initialState = {
  user: {
    _id: "",
    email: "",
    username: "",
    imageURL: "",
  },
  setUser: (_user: User) => {},
} as UserContextInterface;

export const UserContext = createContext(initialState);

export type UserProviderProps = {
  children: ReactNode;
};

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState({
    _id: "",
    email: "",
    username: "",
    imageURL: ""
  });

  useEffect(() => {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo) as User);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
