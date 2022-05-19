import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { useCartService } from "../../contexts/cart-context";
import { px, useAppNavigation } from "../../hooks/utils";
import { Entypo } from '@expo/vector-icons';
import { CartItem } from "../../components/cart-item-component";

export function CartScreen() {
    const cart = useCartService();
    const nav = useAppNavigation();

    useEffect(() => {
        cart.getItemsToCart();
    }, [])

    const doesUserHaveCartItems = !!cart.cartItems.length;
    return (
        <View style={{ flex: 1, backgroundColor: doesUserHaveCartItems ? "#f3f9fe" : "white" }}>
            <View style={{ flexDirection: "row", margin: px(50), alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Entypo name="shopping-cart" size={48} color="black" />
                    <Text style={{ fontSize: px(48), fontWeight: "bold", marginLeft: px(20) }}>Cart</Text>
                </View>
                <TouchableOpacity onPress={() => nav.navigate("Address")} style={{ width: px(80), height: px(80), backgroundColor: "black", justifyContent: "center", alignItems: "center", borderRadius: px(40), alignSelf: "flex-end", }}>
                    <Text style={{ color: "#f3f9fe", fontWeight: "bold", fontSize: px(14) }}>CHECKOUT</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ marginLeft: px(50), color: "lightgray", fontWeight: "bold" }}>Total {cart.cartItems.length} items collected </Text>
            <TouchableOpacity onPress={() => cart.clearCart()}>
                <Text style={{ alignSelf: "flex-end", marginRight: px(20), fontWeight: "bold" }}>DELETE ALL</Text>
            </TouchableOpacity>
            {!cart.cartItems.length ? <View style={{ justifyContent: "center", alignItems: "center", flexGrow: 1, flexDirection: "column" }}>
                <Image source={require("../../../assets/sad_cart.png")} style={{ width: px(100), height: px(100) }} />
                <Text>No items</Text>
            </View> :
                <FlatList
                    data={cart.cartItems}
                    renderItem={({ item }) => <CartItem key={item.id} product={item} />}
                />
            }
        </View>
    );
}
