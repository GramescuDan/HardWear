import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { ProductItem } from "../../components/product-component";
import { useFavoriteService } from "../../contexts/favorites-context";


export function FavoriteScreen() {
    const favorite = useFavoriteService();

    useEffect(() => {
        favorite.getItemsToFavorite();
    }, [])
    
    return (
        <ScrollView>
            {!favorite.favoriteItems.length ? <Text>You have nothing in favorites!</Text> :
                <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
                    {favorite.favoriteItems.map((product, index) => <ProductItem key = {index} />)}
                </View>}
        </ScrollView>
    );
}
