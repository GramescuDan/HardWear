import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { BottomNavBar } from "../../components/BottomNavigationBar";
import { ProductItem } from "../../components/product-component";
import { useCartService } from "../../contexts/cart-context";
import { px } from "../../hooks/utils";


export function CartScreen() {
    const cart = useCartService();

    useEffect(() => {
        cart.getItemsToCart();
    }, [])

    const doesUserHaveCartItems = !!cart.cartItems.length;

    return (
        <View style={{ flex: 1, backgroundColor: doesUserHaveCartItems ? "#eff2ef" : "white", }}>
            {!cart.cartItems.length ? <View style={{ justifyContent: "center", alignItems: "center", flexGrow: 1, flexDirection: "column" }}>
                <Image source={require("../../../assets/sad_cart.png")} style={{ width: px(100), height: px(100) }} />
                <Text>No favorites</Text>
            </View> :
                <ScrollView style={{ flex: 1, }}>

                    <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
                        {cart.cartItems.map((product, index) => <ProductItem key={index} />)}
                    </View>
                </ScrollView>
            }
        </View>
    );
}
