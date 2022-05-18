import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { px, useEffectAsync } from "../../hooks/utils";
import { AntDesign } from '@expo/vector-icons';
import { useCartService } from "../../contexts/cart-context";
import { useFavoriteService } from "../../contexts/favorites-context";
import { useRoute } from "@react-navigation/native";
import { useItemsContext } from "../../contexts/items-context";
import { Item } from "./product-list-screen";

export function SingleProductScreen() {
    const cart = useCartService();
    const route = useRoute();
    const params = route.params as { id: number };
    // momentan
    const [isFavorite, setIsFavorite] = useState(false);
    const favorites = useFavoriteService();
    const { getItemsById } = useItemsContext();
    const [singleItem, setSingleItem] = useState<Item>();

    const onFavoriteChange = () => {
        favorites.addItemToFavorite({ name: "name", image: require("../../../assets/phone.jpg"), inStock: true, price: 20, quantity: 10 })
        setIsFavorite(!isFavorite);
    }

    useEffectAsync(async () => {
        const data = await getItemsById(params.id);
        setSingleItem(data);
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: "white", }}>
            <View style={{ flexGrow: 0.1, alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity>
                    <Image source={require("../../../assets/phone.jpg")} style={{ width: px(300), height: px(300) }} />
                </TouchableOpacity>
            </View>
            <View style={{ flexGrow: 1, backgroundColor: "#f3f9fe", borderTopEndRadius: px(50), borderTopLeftRadius: px(50) }}>
                <View style={{ flex: 1, margin: px(50), flexDirection: "column" }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontWeight: "bold", fontSize: px(18) }}>{singleItem?.name}</Text>
                        <TouchableOpacity onPress={onFavoriteChange} style={{}}>
                            <Image source={!isFavorite ? require("../../../assets/heart.png") : require("../../../assets/heart-filled.png")} style={[{ width: px(19), height: px(17) }, isFavorite ? { tintColor: "darkred" } : { tintColor: "gray" }]} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ marginTop: px(10), fontSize: px(14), color: "gray" }}>{singleItem?.description}</Text>
                    <View style={{ marginTop: px(25), flexDirection: "row", borderStyle: "solid", justifyContent: "space-between", padding: px(20), borderWidth: 1, borderColor: "lightgray", borderRadius: px(10) }}>
                        <Text>Price</Text>
                        <Text style={{ fontWeight: "bold" }}>{singleItem?.price}$</Text>
                    </View>
                    <TouchableOpacity onPress={() => cart.addItemToCart(singleItem!)}
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            alignSelf: "center",
                            width: px(150),
                            justifyContent: "center",
                            alignItems: "center",
                            flexGrow: 0.4,
                            borderRadius: px(6),
                            marginTop: px(20),
                            backgroundColor: "gray"
                        }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>Add To Cart</Text>
                        <AntDesign name="shoppingcart" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
