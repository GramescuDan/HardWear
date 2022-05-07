import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { AuthentificationBox } from "../components/AuthentificationBox";
import { StackNavComponent } from "../components/StackNavigation";
import { px, useAppNavigation } from "../hooks/utils";
import UserService from '../services/user';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CustomTextInput } from "../components/custom-text-inputs";
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export type RegInfo<T> = {
    id: number,
    username: T,
    email: T,
    password: T,
    firstName: T,
    lastName: T,
    phone: T,
    date: T
}


export function RegistrationScreen() {
    const nav = useAppNavigation();
    const [regInfo, setRegInfo] = useState<RegInfo<string>>({
        id: 0,
        date: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        phone: "",
        username: ""
    })
  
    const register = async (regInfo: RegInfo<string>) => {
        try {
            const data = await (await UserService.register(regInfo)).data;
            if (data.toString().slice(0, 15) === "<!DOCTYPE html>") {
                return;  //eroare pe backend
            }
            nav.navigate("Login");
        } catch (e) {
            console.log(e);
        }
    }

    const onChangeUsername = (val: string) => {
        setRegInfo({...regInfo!, username: val});
    }

    const onChangePassword = (val: string) => {
        setRegInfo({...regInfo!, password: val});
    }

    const onChangeEmail = (val: string) => {
        setRegInfo({...regInfo!, email: val});
    }

    const onChangeFirstName = (val: string) => {
        setRegInfo({...regInfo!, firstName: val});
    }

    const onChangeLastName = (val: string) => {
        setRegInfo({...regInfo!, lastName: val});
    }

    const onChangePhone = (val: string) => {
        setRegInfo({...regInfo!, phone: val});
    }

    const onChangeDate = (val: string) => {
        setRegInfo({...regInfo!, date: val});
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
        <CustomTextInput
            value={regInfo?.email}
            onChangeText = {onChangeEmail}
            placeholderText="Enter your email"
            icon={<Entypo name="mail" size={24} color="gray" />}
            key = {2}
        />,
        <CustomTextInput
            value={regInfo?.firstName}
            onChangeText = {onChangeFirstName}
            placeholderText="Enter your first name"
            icon={<MaterialIcons name="drive-file-rename-outline" size={24} color="gray" />}
            key = {3}
        />,
        <CustomTextInput
            value={regInfo?.lastName}
            onChangeText = {onChangeLastName}
            placeholderText="Enter your last name"
            icon={<MaterialIcons name="drive-file-rename-outline" size={24} color="gray" />}
            key = {4}
        />,
        <CustomTextInput
            value={regInfo?.phone}
            onChangeText = {onChangePhone}
            placeholderText="Enter your phone number"
            icon={<Entypo name="phone" size={24} color="gray" />}
            key = {5}
        />,
        <CustomTextInput
            value={regInfo?.date}
            onChangeText = {onChangeDate}
            placeholderText="Enter your date of birth"
            icon={<Entypo name="calendar" size={24} color="gray" />}
            key = {6}
        />,
    ]
    return (

        <AuthentificationBox
            title="Register now"
            textInputs={inputs}
            buttonText = "REGISTER"
            buttonOnPress = {() => register(regInfo!)}
        ></AuthentificationBox>

    );
}
