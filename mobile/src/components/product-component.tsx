import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, ImageSourcePropType } from "react-native";
import { px } from "../hooks/utils";
import { AntDesign } from '@expo/vector-icons';
import { useCartService } from "../contexts/cart-context";
import { useFavoriteService } from "../contexts/favorites-context";

export interface Product {
    image: ImageSourcePropType,
    description: string,
    inStock: boolean,
    price: number
}

export function ProductItem(p: { isCart?: boolean }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const cart = useCartService();
    const favorites = useFavoriteService();

    const onFavoriteChange = () => {
        favorites.addItemToFavorite({ description: "description", image: require("../../assets/phone.jpg"), inStock: true, price: 200 })
        setIsFavorite(!isFavorite);
    }
    return <View style={{ flexDirection: "column", marginTop: px(15), backgroundColor: "white", padding: px(20), width: px(185), height: px(300) }}>
        <View style={{ flexDirection: "row" }}>
            {!p.isCart && <TouchableOpacity onPress={onFavoriteChange}>
                <Image source={!isFavorite ? require("../../assets/heart.png") : require("../../assets/heart-filled.png")} style={[{ width: px(19), height: px(17) }, isFavorite ? { tintColor: "darkred" } : { tintColor: "gray" }]} />
            </TouchableOpacity>}
            <Image source={require("../../assets/phone.jpg")} style={{ width: px(130), height: px(130) }} />
        </View>
        <Text style={{ marginTop: px(10) }}>Product description</Text>
        <Text>In stock</Text>
        <Text>Price</Text>
        {!p.isCart && <TouchableOpacity onPress={() => cart.addItemToCart({ description: "description", image: require("../../assets/phone.jpg"), inStock: true, price: 200 })} style={{ flex: 1, flexDirection: "row", width: px(150), height: px(30), borderRadius: px(6), marginTop: px(20), backgroundColor: "gray", justifyContent: "space-around", alignItems: "center", }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Add To Cart</Text>
            <AntDesign name="shoppingcart" size={24} color="white" />
        </TouchableOpacity>}
    </View>
}