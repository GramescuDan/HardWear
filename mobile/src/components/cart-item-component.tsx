import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, ImageSourcePropType, ViewStyle } from "react-native";
import { px } from "../hooks/utils";
import { FontAwesome } from '@expo/vector-icons';

export function CartItem(p: { areAllChecked?: boolean }) {
    const [isChecked, setIsChecked] = useState(false);

    const onCheckedChange = () => {
        setIsChecked(!isChecked);
    }
    return (

        <View style={{ flexDirection: "row", marginTop: px(15), width: px(350), height: px(180), borderRadius: px(20), borderStyle: "solid", borderWidth: px(1.5), borderColor: "lightgray" }}>
            <View style={{ flex: 1, margin: px(20), flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                    <Image source={require("../../assets/phone.jpg")} style={{ width: px(80), height: px(100), borderWidth: px(1), borderColor: "lightgray", borderRadius: px(10) }} />
                    <View style={{ flexDirection: "column", marginLeft: px(20) }}>
                        <Text style={{ fontWeight: "bold" }}>Product name</Text>
                        <Text style={{ fontWeight: "bold" }}>Price</Text>
                        <Text style={{ marginTop: px(10), fontSize: 13, color: "gray" }}>Quantity   <Text style={{ fontWeight: "bold", color: "black" }}>{3}</Text> </Text>
                    </View>
                </View>
                <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={onCheckedChange}>
                    <FontAwesome name="check-circle" size={36} color="black" style={[{ width: px(36) }, isChecked ? { color: "black" } : { color: "lightgray" }]} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
