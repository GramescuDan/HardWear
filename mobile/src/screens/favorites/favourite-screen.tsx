import React, { useEffect } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { ProductItem } from "../../components/product-component";
import { useFavoriteService } from "../../contexts/favorites-context";
import { px } from "../../hooks/utils";


export function FavoriteScreen() {
    const favorite = useFavoriteService();

    useEffect(() => {
        favorite.getItemsToFavorite();
    }, [])

    const doesUserHaveFavorites = !!favorite.favoriteItems.length;

    return (
        <View style = {{flex: 1, backgroundColor: doesUserHaveFavorites ? "#eff2ef" : "white", }}>
            {!favorite.favoriteItems.length ? <View style={{ justifyContent: "center", alignItems: "center", flexGrow: 1, flexDirection: "column" }}>
                <Image source={require("../../../assets/sad_heart.jpg")} style={{ width: px(100), height: px(100) }} />
                <Text>No favorites</Text>
            </View> :
                <ScrollView style={{ flex: 1,  }}>

                    <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
                        {favorite.favoriteItems.map((product, index) => <ProductItem key={index} />)}
                    </View>
                </ScrollView>
            }
        </View>

    );
}
