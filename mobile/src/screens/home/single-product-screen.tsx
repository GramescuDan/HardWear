import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { px } from "../../hooks/utils";
import { AntDesign } from '@expo/vector-icons';
import { useCartService } from "../../contexts/cart-context";
import { useFavoriteService } from "../../contexts/favorites-context";


export function SingleProductScreen() {
    const cart = useCartService();

    // momentan
    const [isFavorite, setIsFavorite] = useState(false);
    const favorites = useFavoriteService();

    const onFavoriteChange = () => {
        favorites.addItemToFavorite({ name: "name", image: require("../../../assets/phone.jpg"), inStock: true, price: 20, quantity: 10 })
        setIsFavorite(!isFavorite);
    }
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
                        <Text style={{ fontWeight: "bold", fontSize: px(18) }}>Product Name</Text>
                        <TouchableOpacity onPress={onFavoriteChange} style={{}}>
                            <Image source={!isFavorite ? require("../../../assets/heart.png") : require("../../../assets/heart-filled.png")} style={[{ width: px(19), height: px(17) }, isFavorite ? { tintColor: "darkred" } : { tintColor: "gray" }]} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ marginTop: px(10), fontSize: px(14), color: "gray" }}>Product Description</Text>
                    <View style={{ marginTop: px(25), flexDirection: "row", borderStyle: "solid", justifyContent: "space-between", padding: px(20), borderWidth: 1, borderColor: "lightgray", borderRadius: px(10) }}>
                        <Text>Price</Text>
                        <Text style={{ fontWeight: "bold" }}>89$</Text>
                    </View>
                    <TouchableOpacity onPress={() => cart.addItemToCart({ name: "description", image: require("../../../assets/phone.jpg"), inStock: true, price: 200, quantity: 10 })}
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