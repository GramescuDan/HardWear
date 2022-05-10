import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Touchable } from "react-native";
import { BottomNavBar } from "../../components/BottomNavigationBar";
import { ProductItem } from "../../components/product-component";
import { useCartService } from "../../contexts/cart-context";
import { px } from "../../hooks/utils";
import { Entypo } from '@expo/vector-icons';
import { CartItem } from "../../components/cart-item-component";


export function CartScreen() {
    const cart = useCartService();
    const [areSelected, setAreSelected] = useState(false);
    useEffect(() => {
        cart.getItemsToCart();
    }, [])

    const doesUserHaveCartItems = !!cart.cartItems.length;

    const areAllSelected = () => {
        setAreSelected(!areSelected);
    }

    return (
        <View style={{ flex: 1, backgroundColor: doesUserHaveCartItems ? "#f3f9fe" : "white" }}>
            <View style={{ flexDirection: "row", margin: px(50), alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Entypo name="shopping-cart" size={48} color="black" />
                    <Text style={{ fontSize: px(48), fontWeight: "bold", marginLeft: px(20) }}>Cart</Text>
                </View>
                <TouchableOpacity style={{ width: px(80), height: px(80), backgroundColor: "black", justifyContent: "center", alignItems: "center", borderRadius: px(40), alignSelf: "flex-end", }}>
                    <Text style={{ color: "#f3f9fe", fontWeight: "bold" }}>CHECKOUT</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ marginLeft: px(50), color: "lightgray", fontWeight: "bold" }}>Total {cart.cartItems.length} items collected </Text>
            <TouchableOpacity onPress={areAllSelected}>
                <Text style={{ alignSelf: "flex-end", marginRight: px(20), fontWeight: "bold" }}>SELECT ALL</Text>
            </TouchableOpacity>
            {!cart.cartItems.length ? <View style={{ justifyContent: "center", alignItems: "center", flexGrow: 1, flexDirection: "column" }}>
                <Image source={require("../../../assets/sad_cart.png")} style={{width: px(100), height: px(100) }} />
                <Text>No favorites</Text>
            </View> :
                <View >
                    <ScrollView style={{ marginBottom: px(0) }}>
                        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
                            {cart.cartItems.map((product, index) => <CartItem key={index}></CartItem>)}
                        </View>
                    </ScrollView>

                </View>
            }

        </View>
    );
}