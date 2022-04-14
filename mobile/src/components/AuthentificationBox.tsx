import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { px } from "../hooks/utils";
import { PurpleModal } from "./PurpleModal";

export function AuthentificationBox(p: { welcome: string, completeFields: string, email?: string, password?: string, checkAccount?: string, buttonText?: string, buttonOnPress?: () => void}) {
    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <PurpleModal>
                <View style={{ marginTop: px(52), marginRight: px(93), marginBottom: px(62), marginLeft: px(69) }}>
                    <Text style={{ fontFamily: "Open-Sans-Bold", marginBottom: 10, color: "white", fontSize: 20 }}>{p.welcome},</Text>
                    <Text style={{ fontFamily: "Open-Sans", color: "#9D9C9D", fontSize: 10, marginBottom: 30 }}>{p.completeFields}</Text>
                    <Text style={{ fontFamily: "JetBrainsMono", color: "white", fontSize: 15, marginBottom: px(8) }}>{p.email}</Text>
                    <View style={{ flexDirection: "row", borderWidth: 2, borderColor: "#4C264C", borderRadius: 9, alignItems: "center", height: px(30) }}>
                        <Text>   </Text>
                        <TextInput
                            placeholder="your e-mail here"
                            placeholderTextColor="#9D9C9D"
                            style={{ width: px(200), fontFamily: "JetBrainsMono", color: "white", fontSize: 10 }}
                        />
                    </View>
                    <Text style={{ fontFamily: "JetBrainsMono", color: "white", fontSize: 15, marginBottom: px(8), marginTop: px(20) }}>{p.password}</Text>
                    <View style={{ flexDirection: "row", borderWidth: 2, borderColor: "#4C264C", borderRadius: 9, alignItems: "center", height: px(30) }}>
                        <Text>   </Text>
                        <TextInput
                            placeholder="your password here"
                            placeholderTextColor="#9D9C9D"
                            style={{ width: px(200), fontFamily: "JetBrainsMono", color: "white", fontSize: 10 }}
                        />
                    </View>
                    <TouchableOpacity style={{ marginBottom: px(28) }} onPress = {p.buttonOnPress}>
                        <Text style={{ fontFamily: "Open-Sans", color: "#00DB30", fontSize: px(12), textAlign: "right" }}>{p.checkAccount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ maxWidth: px(65), backgroundColor: "#00DB30", borderRadius: px(8), alignItems: "center" }}>
                        <Text style={{ fontFamily: "Open-Sans", fontSize: 10, color: "#E6E6E6", marginLeft: px(10), marginRight: px(10), marginBottom: px(8), marginTop: px(8) }}>{p.buttonText}</Text>
                    </TouchableOpacity>

                </View>
                </PurpleModal>
        </View>
    );
}