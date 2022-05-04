import React from "react";
import { ScrollView, View } from "react-native";
import { ProductItem } from "../../components/product-component";

export function ProductListScreen() {

    return <ScrollView>
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
        </View>
    </ScrollView>



}