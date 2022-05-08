import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { AuthentificationBox } from "../components/AuthentificationBox";
import { CustomTextInput } from "../components/custom-text-inputs";
import { px, useAppNavigation } from "../hooks/utils";
import UserService from '../services/user';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

type RegInfo<T> = {
    username: T,
    password: T
}

export function LoginScreen() {

    const nav = useAppNavigation();
    const [regInfo, setRegInfo] = useState<RegInfo<string>>();
    const [error, setError] =  useState(false);

    const onChangeUsername = (val: string) => {
        setRegInfo({...regInfo!, username: val});
    }

    const onChangePassword = (val: string) => {
        setRegInfo({...regInfo!, password: val});
    }

    const login = async (regInfo: RegInfo<string>) => {
        try {
            const data = await (await UserService.login(regInfo)).data;
            nav.navigate("Products");

        } catch (e) {
            setError(true);
            console.log(e);
        }

    }

    const inputs = [
        <CustomTextInput
            value={regInfo?.username}
            onChangeText = {onChangeUsername}
            placeholderText="Enter your username"
            icon={<MaterialCommunityIcons name="account" size={24} color="gray" />}
            key = {0}
        />,
        <CustomTextInput
            value={regInfo?.password}
            onChangeText = {onChangePassword}
            placeholderText="Enter your password"
            icon={<Entypo name="lock-open" size={24} color="gray" />}
            key = {1}
        />,
    ]

    return (
        <AuthentificationBox
            title = "Login"
            error = {error}
            textInputs = {inputs}
            buttonText="Log in"
            buttonOnPress={() => login(regInfo!)}
        ></AuthentificationBox>

    );
}