import React from "react";
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from "react-native";
import { px, useAppNavigation } from "../hooks/utils";
import { SubCategoryType } from "../screens/home/home-screen";

export function CategoryBox(p: { categoryName: string, imageSource: ImageSourcePropType, subCategory?: SubCategoryType[] }) {
    const nav = useAppNavigation();

    const onPress = () => {
        if (p.subCategory) {
            nav.navigate("SubCategory", { subCategory: p.subCategory });
        } else {
            nav.navigate("ProductList", {})
        }
    }

    return <TouchableOpacity onPress={onPress} style={{ width: px(150), height: px(150), marginTop: px(20), backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
        <Image source={p.imageSource} style={{ width: "50%", height: "50%" }} />
        <Text style={{ fontSize: px(12), fontWeight: "bold", marginTop: px(15), flexWrap: "wrap" }}>{p.categoryName}</Text>
    </TouchableOpacity>
}
