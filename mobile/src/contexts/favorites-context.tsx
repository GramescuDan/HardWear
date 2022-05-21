import React, { createContext, ReactNode, useContext, useState } from "react";
import { AsyncStorage } from "react-native";
import { Item } from "../screens/home/product-list-screen";

export const FavoriteContext = createContext<ReturnType<typeof useFavorite>>(null!);

export function useFavoriteService() {
    const context = useContext(FavoriteContext);
    return context();
}

function useFavorite() {
    const [favoriteItems, setFavoriteItems] = useState<Item[]>([]);

    const addItemToFavorite = (product: Item) => {
        favoriteItems.push(product);
        setFavoriteItems([...favoriteItems]);
        AsyncStorage.setItem("favorite", JSON.stringify(favoriteItems))
    }

    const removeItemFormFavorites = (product: Item) => {
        const index = favoriteItems.indexOf(product);
        favoriteItems.splice(index, 1);
        setFavoriteItems([...favoriteItems]);
        AsyncStorage.setItem("favorite", JSON.stringify(favoriteItems))
    }

    const getItemsToFavorite = async () => {
        const favorite = await AsyncStorage.getItem("favorite");
        if (favorite) {
            setFavoriteItems(JSON.parse(favorite!));
        }
    }

    const isItemFavorite = (item: Item) => {
        return favoriteItems.some(favorites => favorites.id === item.id);
    }

    return function () {

        return {
            favoriteItems,
            addItemToFavorite,
            getItemsToFavorite,
            removeItemFormFavorites,
            isItemFavorite
        }
    }
}

export function FavoriteContextProvider(p: { children?: ReactNode }) {
    const service = useFavorite();
    return <FavoriteContext.Provider value={service}>
        {p.children}
    </FavoriteContext.Provider>
}
