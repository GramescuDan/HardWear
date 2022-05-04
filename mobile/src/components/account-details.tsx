import React, { JSXElementConstructor } from "react";
import { View, Text } from "react-native";
import { px } from "../hooks/utils";

export function AccountDetails(p: { image: string, name: string, surname: string, email: string, password: string }) {

    return (
        <View style={{ backgroundColor: "#191419", flex: 1}}>
            <View style={{ marginLeft: px(30), marginRight: px(30), marginTop: px(30),backgroundColor: "#331F33", borderRadius: px(28), flexDirection: "column", alignItems: "flex-start"}}>
                <Text style={{ marginTop: px(10), color: "white", fontWeight: "bold", fontSize: px(15) }}>  Account Details</Text>
                {/* <img src = "">{p.image}></img> */}
                <Text style={{ marginTop: px(10), color: "white", fontWeight: "bold", fontSize: px(15) }}>  Name: {p.name}</Text>
                <Text style={{ marginTop: px(10), color: "white",  fontWeight: "bold", fontSize: px(15) }}>  Surname: {p.surname}</Text>
                <Text style={{ marginTop: px(10), color: "white", fontWeight: "bold", fontSize: px(15) }}>  Email: {p.email}</Text>
                <Text style={{ marginTop: px(10), marginBottom: px(10), color: "white",  fontWeight: "bold", fontSize: px(15) }}>  Password: {p.password}</Text>

            </View>
        </View>
    );
}