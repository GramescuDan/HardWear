import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useAppNavigation } from "../../App";
import { AuthentificationBox } from "../components/AuthentificationBox";
import { PurpleModal } from "../components/PurpleModal";
import { px } from "../hooks/utils";

export function MainScreen() {
    const nav = useAppNavigation();
    const goToLogin = () => {
        nav.navigate("Login");
    }
    const goToRegister = () => {
        nav.navigate("Registration");
    }
    return (
   
         <View style={{ backgroundColor: "white", flex: 1 }}>

             <PurpleModal > 
             <View style={{marginTop: px(52), marginRight: px(93), marginBottom: px(62), marginLeft: px(69) }}>
                    <Text style={{ fontFamily: "Open-Sans-Bold", marginBottom: 10, color: "white", fontSize: 20 }}>Hello!</Text>
                    <Text style={{ fontFamily: "Open-Sans", color: "#9D9C9D", fontSize: 10 }}>Welcome to HardWear,</Text>
                    <View style = {{flexDirection: "column", alignItems: "center"}}>
                    <TouchableOpacity style={{ alignItems: "center", padding: px(5), maxWidth: px(75), backgroundColor: "#00DB30", borderRadius: px(8), marginTop: px(30)}} onPress = {goToLogin}>
                        <Text style={{ fontFamily: "Open-Sans-Bold", fontSize: 10, color: "#E6E6E6", marginLeft: px(10), marginRight: px(10)}}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ padding: px(5), maxWidth: px(75), borderWidth: px(1), borderColor: "#00DB30", borderRadius: px(8), marginTop: px(8)}} onPress = {goToRegister}>
                        <Text style={{ fontFamily: "Open-Sans-Bold", color: "white", fontSize: px(12), textAlign: "right" }}>Register</Text>
                    </TouchableOpacity>
                    </View>
                    </View>
             </PurpleModal>
         </View>
        
    );
}