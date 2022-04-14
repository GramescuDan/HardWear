import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useAppNavigation } from "../../App";
import { AuthentificationBox } from "../components/AuthentificationBox";
import { px } from "../hooks/utils";


export function RegistrationScreen() {
    const nav = useAppNavigation();
    const goToLogin = () => {
      nav.navigate("Login");
    }
    return (
        <AuthentificationBox
            welcome="Hello"
            completeFields="Please complete the fields"
            email="E-mail"
            password="Password"
            checkAccount="Have an account already?"
            buttonText="Register"
            buttonOnPress = {goToLogin}
        ></AuthentificationBox>

    );
}
