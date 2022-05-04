import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import { Product } from "../components/product-component";


export const FavoriteContext = createContext<ReturnType<typeof useFavorite>>(null!);

export function useFavoriteService() {
    const context = useContext(FavoriteContext);
    return context();
}

function useFavorite() {
    const [favoriteItems, setFavoriteItems] = useState<Product[]>([]);

    const addItemToFavorite = (product: Product) => {
        favoriteItems.push(product);
        setFavoriteItems([...favoriteItems]);
        AsyncStorage.setItem("favorite", JSON.stringify(favoriteItems))
    }

    const getItemsToFavorite = async () => {
        const favorite = await AsyncStorage.getItem("favorite");
        setFavoriteItems(JSON.parse(favorite!));
    }

    return function() {

        return {
            favoriteItems,
            addItemToFavorite,
            getItemsToFavorite
        }
    }
}

export function FavoriteContextProvider(p: {children?: ReactNode}) {
    const service = useFavorite();
    return <FavoriteContext.Provider value = {service}>
        {p.children}
    </FavoriteContext.Provider>
}
