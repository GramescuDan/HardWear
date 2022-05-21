import React, { useEffect } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { FavouriteItem } from "../../components/favourite-item";
import { useFavoriteService } from "../../contexts/favorites-context";
import { px } from "../../hooks/utils";

export function FavoriteScreen() {
    const favorite = useFavoriteService();

    useEffect(() => {
        favorite.getItemsToFavorite();
    }, [])

    const doesUserHaveFavorites = !!favorite.favoriteItems.length;

    return (
        <View style={{ flex: 1, backgroundColor: doesUserHaveFavorites ? "#f3f9fe" : "white", }}>
            {!favorite.favoriteItems.length ? <View style={{ justifyContent: "center", alignItems: "center", flexGrow: 1, flexDirection: "column" }}>
                <Image source={require("../../../assets/sad_heart.jpg")} style={{ width: px(100), height: px(100) }} />
                <Text>No favorites</Text>
            </View> :
                <FlatList
                    data={favorite.favoriteItems}
                    renderItem={({ item }) => <FavouriteItem key={item.id} product={item} />}
                    ListHeaderComponent={<View style={{ justifyContent: "center", alignItems: "center", flexGrow: 0.5 }}>
                        <Image source={require("../../../assets/happy_heart.png")} style={{ width: 120, height: 120, }} />
                        <Text style={{ fontWeight: "bold", fontSize: px(16), color: "black" }}>Favorite articles</Text>
                    </View>}
                />
            }
        </View>
    );
}
