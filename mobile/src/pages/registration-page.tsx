import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { px } from "../hooks/utils";

export function RegistrationScreen() {

    return (
        <View style={{ backgroundColor: "#c6c6c6", flex: 1 }}>
            <View style={{ shadowColor: "black", shadowOpacity: 10, shadowOffset: {height: 1, width: 1}, elevation: 3, backgroundColor: "#331F33", marginTop: px(150), marginRight: px(20), marginLeft: px(20), borderRadius: px(50) }}>
                <View style={{ marginTop: px(52), marginRight: px(93), marginBottom: px(62), marginLeft: px(69) }}>
                    <Text style={{ fontFamily: "Open-Sans-Bold", marginBottom: 10, color: "white", fontSize: 20 }}>Hello,</Text>
                    <Text style={{ fontFamily: "Open-Sans", color: "#9D9C9D", fontSize: 10, marginBottom: 30 }}>Please complete the fields</Text>
                    <Text style={{ fontFamily: "JetBrainsMono", color: "white", fontSize: 15, marginBottom: px(8) }}>E-mail</Text>
                    <View style={{ flexDirection: "row", borderWidth: 2, borderColor: "#4C264C", borderRadius: 9, alignItems: "center", height: px(30) }}>
                        <Text>   </Text>
                        <TextInput
                            placeholder="your e-mail here"
                            placeholderTextColor="#9D9C9D"
                            style={{ width: px(200), fontFamily: "JetBrainsMono", color: "white", fontSize: 10 }}
                        />
                    </View>
                    <Text style={{ fontFamily: "JetBrainsMono", color: "white", fontSize: 15, marginBottom: px(8), marginTop: px(20) }}>Password</Text>
                    <View style={{ flexDirection: "row", borderWidth: 2, borderColor: "#4C264C", borderRadius: 9, alignItems: "center", height: px(30) }}>
                        <Text>   </Text>
                        <TextInput
                            placeholder="your password here"
                            placeholderTextColor="#9D9C9D"
                            style={{ width: px(200), fontFamily: "JetBrainsMono", color: "white", fontSize: 10 }}
                        />
                    </View>
                    <TouchableOpacity style={{ marginBottom: px(28) }}>
                        <Text style={{ fontFamily: "Open-Sans", color: "#00DB30", fontSize: px(12), textAlign: "right" }}>Have an account already?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ maxWidth: px(65), backgroundColor: "#00DB30", borderRadius: px(8), alignItems: "center" }}>
                        <Text style={{ fontFamily: "Open-Sans", fontSize: 10, color: "#E6E6E6", marginLeft: px(10), marginRight: px(10), marginBottom: px(8), marginTop: px(8) }}>Register</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
}
