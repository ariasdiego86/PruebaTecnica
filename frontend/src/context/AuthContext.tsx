"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import {login, register} from "../services/auth";

interface User {
    token: string;
    name?: string;
    email?: string;
}

interface AuthContextType {

    user: User | null;
    loginUser: (email: string, password: string) => Promise <void>;

    registerUser: (name: string, email: string, password: string) => Promise <void>;

    logout: () => void;
    
}

export const AuthContext = createContext<AuthContextType |  undefined> (undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {

    const [user, setUser] = useState<User | null>(null);
    //const [router, setRouter] = useState<any>(null);
    const router = useRouter(); //     


    useEffect( () => {
        const token = localStorage.getItem("token");

        if(token){
            setUser({token});
        }        

    }, []);

    const loginUser = async (email: string, password: string) => {
        const data = await login(email, password);
        localStorage.setItem("token", data.token);
        //localStorage.setItem("name", data.name);
        setUser({token: data.token});
        router.push("/welcome");
    }

    const registerUser = async (name: string, email: string, password: string) => {
        await register(name, email, password);
        router.push("/login");
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/login");
    }

    return (
        <AuthContext.Provider value={{ user, loginUser, registerUser, logout }}>
          {children}
        </AuthContext.Provider>
      );

}

