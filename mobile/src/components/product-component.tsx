import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { px } from "../hooks/utils";
import { AntDesign } from '@expo/vector-icons';
import { useCartService } from "../contexts/cart-context";
import { Item } from "../screens/home/product-list-screen";
import { useItemsContext } from "../contexts/items-context";
import { useAuthService } from "../contexts/auth-context";

export function ProductItem(p: Item) {
    const cart = useCartService();
    const items = useItemsContext();
    const { loginInfo } = useAuthService();

    const onFavoriteChange = () => {
        if (!items.isFavorite(p)) {
            items.saveFavourite(loginInfo?.id!, p.id);
        } else {
            items.removeFavourite(loginInfo?.id!, p.id);
        }
    }

    return (
        <View style={{ opacity: p.quantity ? 1 : 0.5, flexDirection: "column", marginTop: px(15), backgroundColor: "white", padding: px(20), width: px(185), height: px(300) }}>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={onFavoriteChange}>
                    <Image source={!items.isFavorite(p) ? require("../../assets/heart.png") : require("../../assets/heart-filled.png")} style={[{ width: px(19), height: px(17) }, items.isFavorite(p) ? { tintColor: "darkred" } : { tintColor: "gray" }]} />
                </TouchableOpacity>
                <View style={{ width: px(90), height: px(100) }}>
                    <Image source={require("../../assets/phone.jpg")} style={{ borderRadius: px(30), alignSelf: "center", width: px(70), height: px(80) }} />
                </View>
            </View>
            {!p.quantity && <Text style={{ fontSize: 20, fontWeight: "bold", color: "red", transform: [{ rotate: '-45deg' }] }}>OUT OF STOCK</Text>}
            <View style={{ flexDirection: "column", }}>
                <Text style={{ marginTop: px(10) }}>Name: {p.name}</Text>
                <Text>Quantity: {p.quantity}</Text>
                <Text>Price: {p.price}$</Text>
            </View>
            {p.quantity && <Text style={{ color: "green" }}>In stock</Text>}
            <TouchableOpacity onPress={() => cart.addItemToCart(p)} style={{ flex: 1, flexDirection: "row", width: px(150), height: px(30), borderRadius: px(6), marginTop: px(20), backgroundColor: "gray", justifyContent: "space-around", alignItems: "center", }}>
                <Text style={{ color: "white", fontWeight: "bold" }}>Add To Cart</Text>
                <AntDesign name="shoppingcart" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}
