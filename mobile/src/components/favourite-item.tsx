import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useAuthService } from "../contexts/auth-context";
import { useItemsContext } from "../contexts/items-context";
import { px, useAppNavigation } from "../hooks/utils";
import { Item } from "../screens/home/product-list-screen";

export function FavouriteItem(p: { product: Item }) {
    const items = useItemsContext();
    const nav = useAppNavigation();
    const auth = useAuthService();

    const onFavoriteChange = () => {
        items.removeFavourite(auth.loginInfo?.id!, p.product.id);
    }

    const goToSingleProducts = (id: number) => {
        nav.navigate("SingleProduct", { id });
    }

    return (
        <TouchableOpacity onPress={() => goToSingleProducts(p.product.id)} style={{ flexGrow: 0.2, borderRadius: px(10), marginLeft: px(20), marginRight: px(20), backgroundColor: "white", marginTop: px(20), }}>
            <View style={{ margin: px(15) }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={onFavoriteChange}>
                        <Image source={require("../../assets/heart-filled.png")} style={[{ width: px(19), height: px(17) }, { tintColor: "darkred" }]} />
                    </TouchableOpacity>
                    <Text style={{ marginLeft: px(10), fontWeight: "bold", fontSize: px(18) }}>{p.product.name}</Text>
                </View>
                <Text style={{ textAlign: "right", fontSize: px(14), color: "gray" }}>{p.product.price}$</Text>
                <View style={{ flexDirection: "row" }}>
                    <Image source={require("../../assets/phone.jpg")} style={{ width: px(70), height: px(70) }} />
                    <Text style={{ fontWeight: "bold" }}>{p.product.description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
