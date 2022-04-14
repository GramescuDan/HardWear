import React, { JSXElementConstructor } from "react";
import { View } from "react-native";
import { px } from "../hooks/utils";

export function PurpleModal (p: {children: JSX.Element}){

return (
    <View style={{ shadowColor: "black", shadowOpacity: 10, shadowOffset: { height: 1, width: 1 }, elevation: 3, backgroundColor: "#331F33", marginTop: px(150), marginRight: px(20), marginLeft: px(20), borderRadius: px(50) }}>
    {p.children}
    </View>
);
}