import { createContext, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies"
import Router from 'next/router'
import { api } from "../services/api";

export interface User {
    id: string;
    name: string;
    email: string;
    profile_name: string;
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
}

interface AccessResponse {
    access_token: string;
    user: User;
}

interface LoginData {
    email: string;
    password: string;
}

interface SignUpData {
    name: string;
    email: string;
    password: string;
    profile_name: string;
}

interface AuthContextData {
    user: User | null;
    login: (data: LoginData) => Promise<void>; 
    signUp: (data: SignUpData) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthContextProviderProps{
    children: React.ReactNode;
}

export const AuthContextProvider = ({children}: AuthContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;

    const getUserProfile = async (access_token: string) => {
        const { data } = await api.get<User>('/users/profile');

        return data
    }


    useEffect(() => {
        const {'vinci:access_token': access_token } = parseCookies();

        const loadUser = async () => {
            if (access_token) {
                const user = await getUserProfile(access_token);

                setUser(u => user);
            }
        }

        loadUser();
    }, [])

    const logout = () => {
        setUser(null);
        destroyCookie(null, 'vinci:access_token');
        Router.push('/');
    }

    async function login(credentials: {email: string, password: string}) {
        const { data  } = await api.post<AccessResponse>('/auth/login', credentials);

        const { access_token, user } = data;
        setUser(user);
        // Como está do lado do client não é necessário passar o ctx para a função (passa null no lugar)
        // Como diversas aplicações em desenvolvimento utilizando o localhost, é recomendado utilizar um prefixo para o cookie
        setCookie(null, "vinci:access_token", access_token, {
            maxAge: 7 * 24 * 60 * 60, // 7 days
        })

        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        Router.push('/');
    }

    async function signUp(credentials: {name: string, email: string, password: string}) {
        const { data } = await api.post<AccessResponse>('/auth/signup', credentials);

        const { access_token, user } = data;
        setUser(user);
        setCookie(null, "vinci:access_token", access_token, {
            maxAge: 7 * 24 * 60 * 60, // 7 days
        })

        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        Router.push('/');
    }
    return (
        <AuthContext.Provider value={{user, login, isAuthenticated, logout, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}
