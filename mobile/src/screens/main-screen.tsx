import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { px, useAppNavigation } from "../hooks/utils";

export function MainScreen() {
    const nav = useAppNavigation();
    const goToLogin = () => {
        nav.navigate("Login");
    }
    const goToRegister = () => {
        nav.navigate("Registration");
    }
    return (
        <View style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
            <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}>Hello!</Text>
            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Welcome to HardWear</Text>
            <View style={{ marginTop: 20 }}></View>
            <TouchableOpacity style={{ backgroundColor: "darkblue", borderRadius: px(50), alignItems: "center", alignSelf: "center", width: "70%", padding: 5, marginBottom: px(20) }} onPress={goToLogin}>
                <Text style={{ fontSize: 14, color: "#E6E6E6", marginLeft: px(10), marginRight: px(10), marginBottom: px(8), marginTop: px(8), fontWeight: "bold" }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: "darkblue", borderRadius: px(50), alignItems: "center", alignSelf: "center", width: "70%", padding: 5, marginBottom: px(20) }} onPress={goToRegister}>
                <Text style={{ fontSize: 14, color: "#E6E6E6", marginLeft: px(10), marginRight: px(10), marginBottom: px(8), marginTop: px(8), fontWeight: "bold" }}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}
