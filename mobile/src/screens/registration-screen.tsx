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
import { useAuthService } from "../contexts/auth-context";

export type RegInfo<T> = {
    id: number,
    username: T,
    email: T,
    password: T,
    firstName: T,
    lastName: T,
    phone: T,
    location: T
}


export function RegistrationScreen() {
    const nav = useAppNavigation();
    const { register } = useAuthService();
    const [regInfo, setRegInfo] = useState<RegInfo<string>>({
        id: 0,
        location: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        phone: "",
        username: ""
    })

    const [inputValidation, setInputValidation] = useState({
        location: false,
        email: false,
        firstName: false,
        lastName: false,
        password: false,
        phone: false,
        username: false
    })

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

    const onChangelocation = (val: string) => {
        setRegInfo({...regInfo!, location: val});
    }

    const inputs = [
        <CustomTextInput
            value={regInfo?.username}
            onChangeText = {onChangeUsername}
            error={inputValidation.username}
            placeholderText="Enter your username"
            isTextSecured = {false}
            icon={<MaterialCommunityIcons name="account" size={24} color="gray" />}
            key = {0}
        />,
        <CustomTextInput
            value={regInfo?.password}
            onChangeText = {onChangePassword}
            error={inputValidation.password}
            placeholderText="Enter your password"
            isTextSecured = {false}
            icon={<Entypo name="lock-open" size={24} color="gray" />}
            key = {1}
        />,
        <CustomTextInput
            value={regInfo?.email}
            onChangeText = {onChangeEmail}
            isTextSecured = {false}
            error={inputValidation.email}
            placeholderText="Enter your email"
            icon={<Entypo name="mail" size={24} color="gray" />}
            key = {2}
        />,
        <CustomTextInput
            value={regInfo?.firstName}
            isTextSecured = {false}
            error={inputValidation.firstName}
            onChangeText = {onChangeFirstName}
            placeholderText="Enter your first name"
            icon={<MaterialIcons name="drive-file-rename-outline" size={24} color="gray" />}
            key = {3}
        />,
        <CustomTextInput
            value={regInfo?.lastName}
            isTextSecured = {false}
            error={inputValidation.lastName}
            onChangeText = {onChangeLastName}
            placeholderText="Enter your last name"
            icon={<MaterialIcons name="drive-file-rename-outline" size={24} color="gray" />}
            key = {4}
        />,
        <CustomTextInput
            value={regInfo?.phone}
            isTextSecured = {false}
            error={inputValidation.phone}
            onChangeText = {onChangePhone}
            placeholderText="Enter your phone number"
            icon={<Entypo name="phone" size={24} color="gray" />}
            key = {5}
        />,
        <CustomTextInput
            value={regInfo?.location}
            isTextSecured = {false}
            error={inputValidation.location}
            onChangeText = {onChangelocation}
            placeholderText="Enter your location"
            icon={<Entypo name="calendar" size={24} color="gray" />}
            key = {6}
        />,
    ]
    return (

        <AuthentificationBox
            title="Register now"
            textInputs={inputs}
            buttonText = "REGISTER"
            buttonOnPress = {() => {
                if (regInfo.email === "" || regInfo.firstName === "" || regInfo.lastName === "" || regInfo.location === "" || regInfo.password === "" || regInfo.phone === "" || regInfo.username === "") {
                    setInputValidation({
                        email: regInfo.email === "" ? true : false,
                        firstName: regInfo.firstName === "" ? true : false,
                        location: regInfo.location === "" ? true : false,
                        lastName: regInfo.lastName === "" ? true : false,
                        password: regInfo.password === "" ? true : false,
                        phone: regInfo.phone === "" ? true : false,
                        username: regInfo.username === "" ? true : false,
                    })
                } else {
                    register(regInfo!);

                }
            }}
        ></AuthentificationBox>

    );
}
