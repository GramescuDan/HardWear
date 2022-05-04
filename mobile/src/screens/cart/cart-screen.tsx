import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { BottomNavBar } from "../../components/BottomNavigationBar";
import { ProductItem } from "../../components/product-component";
import { useCartService } from "../../contexts/cart-context";


export function CartScreen() {
    const cart = useCartService();

    useEffect(() => {
        cart.getItemsToCart();
    }, [])

    return (
        <ScrollView>
            {!cart.cartItems.length ? <Text>You have nothing in cart!</Text> :
                <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
                    {cart.cartItems.map((product, index) => <ProductItem key = {index} isCart />)}
                </View>}
        </ScrollView>
    );
}