import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { AuthentificationBox } from "../components/AuthentificationBox";
import { StackNavComponent } from "../components/StackNavigation";
import { px, useAppNavigation } from "../hooks/utils";


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
            textOnPress = {goToLogin}
        ></AuthentificationBox>

    );
}
