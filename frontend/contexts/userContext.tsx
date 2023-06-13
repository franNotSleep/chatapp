import React from "react";
import { Dispatch, ReactNode, SetStateAction, useState, createContext } from "react";

export type User = {
    _id: string;
    username: string;
    email: string;
}

export interface UserContextInterface {
    user: User, 
    setUser: Dispatch<SetStateAction<User>>
}

const initialState = {
    user: {
        _id: "",
        email: "",
        username: ""
    },
    setUser: (user: User) => {},
} as UserContextInterface

export const UserContext = createContext(initialState);

type UserProviderProps = {
    children: ReactNode
}

function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState({
        _id: "",
        email: "",
        username: ""
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;
