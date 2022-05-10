import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAppNavigation } from "../hooks/utils";
import { User } from "../models/user";
import { EditableInputs } from "../screens/account/my-profile";
import { LoginInfo } from "../screens/login-screen";
import { RegInfo } from "../screens/registration-screen";
import UserService from '../services/user';

export const AuthContext = createContext<ReturnType<typeof useAuth>>(null!);

export function useAuthService() {
    const context = useContext(AuthContext);
    return context();
}

function useAuth() {
    const nav = useAppNavigation();
    const [loginInfo, setLoginInfo] = useState<User>();
    return function () {

        const login = async (regInfo: LoginInfo<string>, setError: React.Dispatch<React.SetStateAction<boolean>>) => {
            try {
                const data = await (await UserService.login(regInfo)).data;
                setLoginInfo(data);
                nav.navigate("Products");
            } catch (e) {
                setError(true);
                console.log(e);
            }
        }

        const register = async (regInfo: RegInfo<string>) => {
            try {
                const data = await (await UserService.register(regInfo)).data;
                nav.navigate("Login");
            } catch (e) {
                console.log(e);
            }
        }

        const editProfile = async (fields: EditableInputs<string>) => {
            try {
                await UserService.editProfile(fields);
                nav.navigate("Home");
            } catch (e) {
                console.log(e)
            }
        }

        const doLogout = () => {
            setLoginInfo(undefined);
            nav.navigate("Login");
        }

        
        return {
            login,
            register,
            loginInfo,
            editProfile,
            doLogout
        }
    }
}

export function AuthContextProvider(p: { children?: ReactNode }) {
    const service = useAuth();
    return <AuthContext.Provider value={service}>
        {p.children}
    </AuthContext.Provider>
}
