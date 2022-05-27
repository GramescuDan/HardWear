import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import { FavouriteItem } from "../../components/favourite-item";
import { useAuthService } from "../../contexts/auth-context";
import { px } from "../../hooks/utils";

export function FavoriteScreen() {
    const auth = useAuthService();
    const doesUserHaveFavorites = !!auth.loginInfo?.favouriteItems.length;
    return (
        <View style={{ flex: 1, backgroundColor: doesUserHaveFavorites ? "#f3f9fe" : "white", }}>
            {!auth.loginInfo?.favouriteItems.length ? <View style={{ justifyContent: "center", alignItems: "center", flexGrow: 1, flexDirection: "column" }}>
                <Image source={require("../../../assets/sad_heart.jpg")} style={{ width: px(100), height: px(100) }} />
                <Text>No favorites</Text>
            </View> :
                <FlatList
                    data={auth.loginInfo?.favouriteItems}
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
