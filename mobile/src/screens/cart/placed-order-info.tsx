import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useCartService } from "../../contexts/cart-context";
import { px, useAppNavigation } from "../../hooks/utils";

export function PlacedOrderInfo() {
    const nav = useAppNavigation();
    const { clearCart } = useCartService();
    return <View style={{ flex: 1, margin: 20 }}>
        <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: px(24), margin: px(50) }}>THANK YOU!</Text>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ margin: px(40), textAlign: "center" }}>Your order has been placed! You will receive an email receipt shortly.</Text>
        </View>
        <View style={{ flexGrow: 1 }} />
        <TouchableOpacity onPress={() => {
            nav.navigate("CartScreen");
            nav.navigate("Home");
            clearCart();
        }} style={{ alignItems: "center", backgroundColor: "lightblue", padding: 20, borderRadius: 10 }}>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Home </Text>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: px(200) }}>{'>'}</Text>
            </View>
        </TouchableOpacity>
    </View>
}
