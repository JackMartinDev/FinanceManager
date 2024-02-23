import { ReactNode, createContext, useContext, useState } from "react";

type User = {
    id: string,
    username: string
}

type AuthContextType = {
    user: User | null,
    login: (userCredentials: User)=>void,
    logout: () => void,
}

type AuthProviderProps = {
    children: ReactNode,
}

const defaultContextValue: AuthContextType = {
    user: null,
    login: () => {},
    logout: () => {},
};

const AuthContext = createContext(defaultContextValue);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userCredentials:User) => {
        setUser(userCredentials);
        console.log("login", userCredentials.username);
    }

    const logout = () => {
        console.log("logout");
        setUser(null);
    }

    const value = {
        user,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
