import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { px } from "../hooks/utils";
import { MaterialIcons } from '@expo/vector-icons';
import { useCartService } from "../contexts/cart-context";
import { Item } from "../screens/home/product-list-screen";

export function CartItem(p: { product: Item }) {
    const { removeItemFromCart } = useCartService();

    return (
        <View style={{ flexDirection: "row", marginTop: px(15), marginLeft: px(25), width: px(350), height: px(180), borderRadius: px(20), borderStyle: "solid", borderWidth: px(1.5), borderColor: "lightgray" }}>
            <View style={{ flex: 1, margin: px(20), flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                    <Image source={require("../../assets/phone.jpg")} style={{ width: px(80), height: px(100), borderWidth: px(1), borderColor: "lightgray", borderRadius: px(10) }} />
                    <View style={{ flexDirection: "column", marginLeft: px(20) }}>
                        <Text style={{ fontWeight: "bold" }}>Name: {p.product.name}</Text>
                        <Text style={{ fontWeight: "bold" }}>Price: {p.product.price}$</Text>
                        <Text style={{ marginTop: px(10), fontSize: 13, color: "gray" }}>Quantity: <Text style={{ fontWeight: "bold", color: "black" }}>{p.product.quantity}</Text> </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
                        <TouchableOpacity onPress={() => removeItemFromCart(p.product)}>
                            <MaterialIcons name="delete" size={32} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}
