import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { px, useAppNavigation } from "../hooks/utils";
import { PurpleModal } from "./PurpleModal";
import UserService from '../services/user';

export function AuthentificationBox(p: { welcome: string, completeFields: string, email?: string, password?: string, checkAccount?: string, buttonText?: string, textOnPress?: () => void, buttonOnPress?: () => void }) {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const nav = useAppNavigation();


    
     const goToProducts = async () => {
    //     try {
        //   await UserService.login({email: email!, password: password!})
       
        nav.navigate("Products");
    //        console.log("Login");
    //     } catch (e) {
    //         console.log(e);
    //     }
    
    }

    // async function login(url = '', data = {}) {
    //     // Default options are marked with *
    //     const response = await fetch(url, {
    //       method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //       mode: 'cors', // no-cors, *cors, same-origin
    //       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //       credentials: 'same-origin', // include, *same-origin, omit
    //       headers: {
    //         'Content-Type': 'application/json'
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    //       redirect: 'follow', // manual, *follow, error
    //       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //       body: JSON.stringify(data) // body data type must match "Content-Type" header
    //     });
    //     return response.body; // parses JSON response into native JavaScript objects
    //   }
      
    //   function goToProducts() {
    //       try{
    //     login('http://192.168.0.100:8080/login', {email: email!, password: password!})
    //     .then(data => {
    //       console.log(data); // JSON data parsed by data.json() call
    //     }).catch((e) => console.log(e));
    // }
    // catch(e){
    //     console.log(e);
    // }
    //   }

       
    

    const changeEmailInput = (val: string) => {
        setEmail(val);
    };

    const changePasswordInput = (val: string) => {
        setPassword(val);
    };
    return (
        <View style={{ backgroundColor: "#191419", flex: 1 }}>
            <PurpleModal>
                <View style={{ marginTop: px(52), marginRight: px(93), marginBottom: px(62), marginLeft: px(69) }}>
                    <Text style={{ marginBottom: 10, color: "white", fontSize: 20 }}>{p.welcome},</Text>
                    <Text style={{ color: "#9D9C9D", fontSize: 10, marginBottom: 30 }}>{p.completeFields}</Text>
                    <Text style={{ color: "white", fontSize: 15, marginBottom: px(8) }}>{p.email}</Text>
                    <View style={{ flexDirection: "row", borderWidth: 2, borderColor: "#4C264C", borderRadius: 9, alignItems: "center", height: px(30) }}>
                        <Text>   </Text>
                        <TextInput
                            value={email}
                            onChangeText={changeEmailInput}
                            placeholder="your e-mail here"
                            placeholderTextColor="#9D9C9D"
                            style={{ width: px(200), color: "white", fontSize: 10 }}
                        />
                    </View>
                    <Text style={{ color: "white", fontSize: 15, marginBottom: px(8), marginTop: px(20) }}>{p.password}</Text>
                    <View style={{ flexDirection: "row", borderWidth: 2, borderColor: "#4C264C", borderRadius: 9, alignItems: "center", height: px(30) }}>
                        <Text>   </Text>
                        <TextInput
                            value={password}
                            onChangeText={changePasswordInput}
                            placeholder="your password here"
                            placeholderTextColor="#9D9C9D"
                            style={{ width: px(200), color: "white", fontSize: 10 }}
                        />
                    </View>
                    <TouchableOpacity style={{ marginBottom: px(0) }} onPress={p.textOnPress}>
                        <Text style={{ color: "#00DB30", fontSize: px(12), textAlign: "right" }}>{p.checkAccount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ maxWidth: px(65), backgroundColor: "#00DB30", borderRadius: px(8), alignItems: "center" }} onPress={p.buttonOnPress ?? goToProducts}>
                        <Text style={{ fontSize: 10, color: "#E6E6E6", marginLeft: px(10), marginRight: px(10), marginBottom: px(8), marginTop: px(8) }}>{p.buttonText}</Text>
                    </TouchableOpacity>

                </View>
            </PurpleModal>
        </View>
    );
}