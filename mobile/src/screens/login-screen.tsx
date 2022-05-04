import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { AuthentificationBox } from "../components/AuthentificationBox";
import { px, useAppNavigation } from "../hooks/utils";

export function LoginScreen() {
    const nav = useAppNavigation();
    const goToProducts = () => {
      nav.navigate("Products");
    }
    return (
        <AuthentificationBox
            welcome="Welcome back"
            completeFields="Lets make your pc shine like no other"
            email="E-mail"
            password="Password"
            checkAccount="Forgot password?"
            buttonText="Login"
            buttonOnPress = {goToProducts}
        ></AuthentificationBox>

    );
}