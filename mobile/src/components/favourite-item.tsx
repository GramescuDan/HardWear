import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useFavoriteService } from "../contexts/favorites-context";
import { px } from "../hooks/utils";
import { Product } from "./product-component";

export function FavouriteItem(product: Product) {
    const favorites = useFavoriteService();

    const onFavoriteChange = () => {
        favorites.removeItemFormFavorites();
    }
    return (
        <View style={{ flexGrow: 0.3, borderRadius: px(10), marginLeft: px(20), marginRight: px(20), backgroundColor: "white", marginTop: px(20), }}>
            <View style={{ margin: px(15) }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={onFavoriteChange}>
                        <Image source={require("../../assets/heart-filled.png")} style={[{ width: px(19), height: px(17) }, { tintColor: "darkred" }]} />
                    </TouchableOpacity>
                    <Text style={{ marginLeft: px(10), fontWeight: "bold", fontSize: px(16) }}>{product.description}</Text>
                </View>
                <Text style={{ textAlign: "right", fontSize: px(14), color: "gray" }}>{product.price}</Text>
            </View>
        </View>
    );
}