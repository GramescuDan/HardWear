import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleProp, ViewStyle, KeyboardAvoidingView } from "react-native";
import { px, useAppNavigation } from "../hooks/utils";
import { PurpleModal } from "./PurpleModal";


export function AuthentificationBox(p: { title: string, textInputs: JSX.Element[], buttonText: string, buttonOnPress: () => void }) {
    return (
        <View style = {{flex: 1}}>
            <Text style={{ textAlign: "center", marginTop: 50, fontSize: 24, fontWeight: "bold" }}>{p.title}</Text>
            <View style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ marginTop: 20 }}></View>
                {p.textInputs.map(input => input)}
                <TouchableOpacity>
                <Text style = {{textAlign: "right", marginLeft: 50, marginRight: 50, color: "darkblue", fontWeight: "bold"}}>forgot password?</Text>
                </TouchableOpacity>
                <View style={{ flexGrow: 1 }}></View>
                <TouchableOpacity style={{ backgroundColor: "darkblue", borderRadius: px(50), alignItems: "center", alignSelf: "center", width: "70%", padding: 5, marginBottom: px(20) }} onPress={p.buttonOnPress}>
                    <Text style={{ fontSize: 14, color: "#E6E6E6", marginLeft: px(10), marginRight: px(10), marginBottom: px(8), marginTop: px(8), fontWeight: "bold" }}>{p.buttonText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}