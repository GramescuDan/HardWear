import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, ImageSourcePropType } from "react-native";
import { px } from "../hooks/utils";
import { AntDesign } from '@expo/vector-icons';
import { useCartService } from "../contexts/cart-context";
import { useFavoriteService } from "../contexts/favorites-context";


export interface Product {
    image: ImageSourcePropType,
    name: string,
    description?: string,
    inStock: boolean,
    price: number
    quantity: number,
    isSelected?: boolean
}

export function ProductItem(p: { areAllChecked?: boolean }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const cart = useCartService();
    const favorites = useFavoriteService();

    const onFavoriteChange = () => {
        favorites.addItemToFavorite({ name: "name", image: require("../../assets/phone.jpg"), inStock: true, price: 20, quantity: 10 })
        setIsFavorite(!isFavorite);
    }
    return (

        <View style={{ flexDirection: "column", marginTop: px(15), backgroundColor: "white", padding: px(20), width: px(185), height: px(300) }}>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={onFavoriteChange}>
                    <Image source={!isFavorite ? require("../../assets/heart.png") : require("../../assets/heart-filled.png")} style={[{ width: px(19), height: px(17) }, isFavorite ? { tintColor: "darkred" } : { tintColor: "gray" }]} />
                </TouchableOpacity>
                <View style={{ width: px(90), height: px(100) }}>
                    <Image source={require("../../assets/phone.jpg")} style={{ borderRadius: px(30), alignSelf: "center", width: px(70), height: px(80) }} />
                </View>
            </View>
            <View style={{ flexDirection: "column", marginLeft: px(40) }}>
                <Text style={{ marginTop: px(10) }}>Product name</Text>
                <Text>Quantity</Text>
                <Text>Price</Text>

            </View>
            <Text>In stock</Text>
            <TouchableOpacity onPress={() => cart.addItemToCart({ name: "description", image: require("../../assets/phone.jpg"), inStock: true, price: 200, quantity: 10 })} style={{ flex: 1, flexDirection: "row", width: px(150), height: px(30), borderRadius: px(6), marginTop: px(20), backgroundColor: "gray", justifyContent: "space-around", alignItems: "center", }}>
                <Text style={{ color: "white", fontWeight: "bold" }}>Add To Cart</Text>
                <AntDesign name="shoppingcart" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}